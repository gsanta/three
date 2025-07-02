import { useState } from 'react';

type UseDialogProps = {
  dialogId: string;
};

const useDialog = ({ dialogId }: UseDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onDialogOpen = () => {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    if (dialog && dialog.showModal) {
      dialog.showModal();
    }
    setIsDialogOpen(true);
  };

  const onDialogClose = () => {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    if (dialog && dialog.close) {
      dialog.close();
    }
    setIsDialogOpen(false);
  };

  return {
    isDialogOpen,
    onDialogOpen,
    onDialogClose,
  };
};

export default useDialog;
