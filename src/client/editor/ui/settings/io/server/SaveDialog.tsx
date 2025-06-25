import React from 'react';
import { useForm } from 'react-hook-form';
import useSnapshots from '../../../hooks/queries/useSnapshots';
import useSaveSnapshot from '../../../hooks/useSaveSnapshot';
import Toast from '@/client/common/components/lib/Toast';

type SaveForm = {
  name: string;
};

type SaveDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SaveDialog = ({ isOpen, onClose }: SaveDialogProps) => {
  const {} = useSnapshots({ enabled: isOpen });

  const { mutate: saveSnapshot, toastRef } = useSaveSnapshot();

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

  const onSubmit = handleSubmit(({ name }) => {
    saveSnapshot(name);
    handleClose();
  });

  return (
    <dialog id="save-dialog" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Export</h3>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name</legend>
          <input type="text" className="input" placeholder="Type here" {...register('name')} />
        </fieldset>

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
