import React from 'react';
import { useAppSelector } from '@/client/common/hooks/hooks';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';
import useEditorContext from '@/app/editor/useEditorContext';
import Button from '@/client/common/components/lib/Button';

const PlayerDialog = (props: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const {
    controllers: { game },
  } = useEditorContext();

  const players = useAppSelector((state) => state.game.players);
  const currentPlayer = useAppSelector((state) => state.game.currentPlayer);

  const currentPlayerIndex = currentPlayer ? players.indexOf(currentPlayer) + 1 : undefined;

  return (
    <Dialog
      {...props}
      id={'player-dialog'}
      leftAction={
        <Button colorScheme="accent" onClick={() => game.selectNextPlayer()}>
          Next player
        </Button>
      }
      placement="modal-bottom"
      title={`Player ${currentPlayerIndex}/${players?.length}`}
    ></Dialog>
  );
};

export default PlayerDialog;
