import { useState } from 'react';

type UseDialogProps = {
  dialogId: string;
};

const useDialog = ({ dialogId }: UseDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onDialogOpen = () => {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement;
    dialog.showModal();
    setIsDialogOpen(true);
  };

  const onDialogClose = () => {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement;
    dialog.close();
    setIsDialogOpen(false);
  };

  return {
    isDialogOpen,
    onDialogOpen,
    onDialogClose,
  };
};

export default useDialog;
