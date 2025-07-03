import React from 'react';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';
import useEditorContext from '@/app/editor/useEditorContext';
import Avatar from '@/client/common/components/lib/Avatar';

const GameStartDialog = ({ isOpen, onClose }: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const {
    controllers: { game },
  } = useEditorContext();

  const handleClose = () => {
    onClose?.();
  };

  const handleStartGame = () => {
    game.startGame();
    handleClose();
  };

  return (
    <Dialog id={'game-start-dialog'} isOpen={isOpen} size="sm" title={'Start game'}>
      <div className="flex flex-row justify-center gap-2">
        <Avatar onClick={handleStartGame} placeholder="Start" />
        <Avatar onClick={handleClose} placeholder="Close" />
      </div>
    </Dialog>
  );
};

export default GameStartDialog;
