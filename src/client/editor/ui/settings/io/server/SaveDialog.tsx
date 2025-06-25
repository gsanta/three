import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import useSnapshots from '../../../hooks/queries/useSnapshots';
import useCreateSnapshot from '../../../hooks/useSaveSnapshot';
import Toast, { ToastRef } from '@/client/common/components/lib/Toast';
import useUpdateSnapshot from '../../../hooks/useUpdateSnapshot';

type SaveForm = {
  id?: string;
  name?: string;
};

type SaveDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SaveDialog = ({ isOpen, onClose }: SaveDialogProps) => {
  const { snapshots, isSnapshotsPending } = useSnapshots({ enabled: isOpen });

  const {} = useSnapshots({ enabled: isOpen });

  const toastRef = useRef<ToastRef>();

  const { mutate: createSnapshot } = useCreateSnapshot(toastRef);
  const { mutate: updateSnapshot } = useUpdateSnapshot(toastRef);

  const { register, formState, handleSubmit, reset } = useForm<SaveForm>({
    defaultValues: {
      name: '',
    },
    mode: 'onSubmit',
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = handleSubmit(async ({ id, name }) => {
    if (id) {
      await updateSnapshot(id);
    } else if (name) {
      await createSnapshot(name);
    }

    handleClose();
  });

  return (
    <dialog id="save-dialog" className="modal">
      <div className="modal-box">
        <h3 className="divider font-bold text-lg">Save snapshot</h3>

        <div className="flex flex-col gap-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">New snapshot name</legend>
            <input type="text" className="input" placeholder="Type here" {...register('name')} />
          </fieldset>

          <div className="flex flex-col gap-4">
            {isSnapshotsPending ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div className="flex items-center gap-4" key={index}>
                    <div className="skeleton h-6 w-6 shrink-0 rounded-full" />
                    <div className="skeleton h-6 w-60" />
                  </div>
                ))}
              </>
            ) : (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Overwrite existing snapshot</legend>

                {snapshots.map((snapshot) => (
                  <label className="flex items-center gap-4" key={snapshot.id}>
                    <input className="radio radio-neutral" type="radio" value={snapshot.id} {...register('id')} />
                    {snapshot.name}
                  </label>
                ))}
              </fieldset>
            )}
          </div>
        </div>

        <div className="divider" />
        <div className="modal-action">
          <button className="btn btn-sm" onClick={handleClose}>
            Close
          </button>
          <button className={`btn btn-sm btn-warning  ${!formState.isDirty ? 'btn-disabled' : ''}`} onClick={onSubmit}>
            Export
          </button>
        </div>
      </div>
      <Toast ref={toastRef} />
    </dialog>
  );
};

export default SaveDialog;
