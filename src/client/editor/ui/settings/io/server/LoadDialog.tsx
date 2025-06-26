import React from 'react';
import { useForm } from 'react-hook-form';
import useSnapshots from '../../../hooks/queries/useSnapshots';
import useLoadSnapshot from '../../../hooks/useLoadSnapshot';
import ErrorMessage from '@/client/common/components/lib/ErrorMessage';
import IconButton from '@/client/common/components/lib/IconButton';

type LoadForm = {
  id?: string;
};

type LoadDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoadDialog = ({ isOpen, onClose }: LoadDialogProps) => {
  const { snapshots, isSnapshotsPending, snapshotsError } = useSnapshots({ enabled: isOpen });

  const { load, isLoadSnapshotPending } = useLoadSnapshot();

  const { register, formState, handleSubmit, reset } = useForm<LoadForm>({
    defaultValues: {
      id: undefined,
    },
    mode: 'onSubmit',
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = handleSubmit(async ({ id }) => {
    if (id) {
      await load(id);
    }
    handleClose();
  });

  return (
    <dialog id="load-dialog" className="modal">
      <div className="modal-box">
        <h3 className="divider font-bold text-lg">Load snapshot</h3>

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
            <table className="table">
              {snapshots.map((snapshot) => (
                <tr>
                  <td className="w-4">
                    <input
                      className="radio radio-neutral"
                      id={snapshot.id}
                      type="radio"
                      value={snapshot.id}
                      {...register('id')}
                    />
                  </td>
                  <td>
                    <label className="flex items-center gap-4" htmlFor={snapshot.id} key={snapshot.id}>
                      {snapshot.name}
                    </label>
                  </td>
                  <td>
                    <IconButton iconName="BiTrashAlt" />
                  </td>
                </tr>
              ))}
            </table>
          )}
        </div>

        <div className="divider" />
        {snapshotsError && <ErrorMessage error={snapshotsError} fallbackMessage="Failed to load snapshots" />}
        <div className="modal-action">
          <button className={`btn btn-sm ${isLoadSnapshotPending ? 'btn-disabled' : ''}`} onClick={handleClose}>
            Close
          </button>
          <button className={`btn btn-sm btn-warning  ${!formState.isDirty ? 'btn-disabled' : ''}`} onClick={onSubmit}>
            {isLoadSnapshotPending ? <span className="loading loading-spinner" /> : `Load`}
          </button>
        </div>
      </div>
      {/* <Toast ref={toastRef} /> */}
    </dialog>
  );
};

export default LoadDialog;
