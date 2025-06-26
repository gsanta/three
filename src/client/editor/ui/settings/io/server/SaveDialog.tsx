import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import useSnapshots from '../../../hooks/queries/useSnapshots';
import useCreateSnapshot from '../../../hooks/useCreateSnapshot';
import Toast, { ToastRef } from '@/client/common/components/lib/Toast';
import useUpdateSnapshot from '../../../hooks/useUpdateSnapshot';
import ErrorMessage from '@/client/common/components/lib/ErrorMessage';

type SaveForm = {
  id?: string;
  name?: string;
};

type SaveDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SaveDialog = ({ isOpen, onClose }: SaveDialogProps) => {
  const toastRef = useRef<ToastRef>();

  const { snapshots, isSnapshotsPending, snapshotsError } = useSnapshots({ enabled: isOpen });
  const {
    mutate: createSnapshot,
    error: createSnapshotError,
    reset: resetCreateSnapshot,
  } = useCreateSnapshot(toastRef);
  const {
    mutate: updateSnapshot,
    error: updateSnapshotError,
    reset: resetUpdateSnapshot,
  } = useUpdateSnapshot(toastRef);

  const { register, formState, handleSubmit, reset } = useForm<SaveForm>({
    defaultValues: {
      name: '',
    },
    mode: 'onSubmit',
  });

  const handleClose = () => {
    onClose();
    reset();
    resetCreateSnapshot();
    resetUpdateSnapshot();
  };

  const onSubmit = handleSubmit(async ({ id, name }) => {
    resetCreateSnapshot();
    resetUpdateSnapshot();

    try {
      if (id) {
        await updateSnapshot(id);
      } else if (name) {
        await createSnapshot(name);
      }

      handleClose();
    } catch {
      // Handle error silently, as the error is already displayed in the dialog
    }
  });

  const errorMessage = createSnapshotError || updateSnapshotError || snapshotsError;

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
        <div className="flex flex-col gap-2">{errorMessage && <ErrorMessage error={errorMessage} />}</div>
        <div className="modal-action">
          <button className="btn btn-sm" onClick={handleClose}>
            Close
          </button>
          <button className={`btn btn-sm btn-warning  ${!formState.isDirty ? 'btn-disabled' : ''}`} onClick={onSubmit}>
            Save
          </button>
        </div>
      </div>
      <Toast ref={toastRef} />
    </dialog>
  );
};

export default SaveDialog;
