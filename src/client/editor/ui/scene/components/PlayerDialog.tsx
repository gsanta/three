import React from 'react';
import { useAppSelector } from '@/client/common/hooks/hooks';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';
import useEditorContext from '@/app/editor/useEditorContext';
import Button from '@/client/common/components/lib/Button';
import Avatar from '@/client/common/components/lib/Avatar';
import PlayerDecorator from '@/client/editor/models/block/categories/PlayerDecorator';

const PlayerDialog = (props: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const {
    controllers: { game },
    tool,
  } = useEditorContext();

  const players = useAppSelector((state) => state.game.players);
  const currentPlayer = useAppSelector((state) => state.game.currentPlayer);
  const playerDecorator = useAppSelector(
    (state) => state.block.decorations.players[currentPlayer || ''],
  ) as PlayerDecorator;
  const maxWork = playerDecorator?.maxWork || 0;
  const remaininWork = playerDecorator?.remainingWork || 0;

  const currentPlayerIndex = currentPlayer ? players.indexOf(currentPlayer) + 1 : undefined;

  return (
    <Dialog
      {...props}
      hasBackdrop={false}
      id={'player-dialog'}
      leftAction={
        <Button
          colorScheme="accent"
          onClick={(e) => {
            e.preventDefault();
            game.selectNextPlayer();
          }}
        >
          Next player
        </Button>
      }
      onSubmit={(e) => {
        e.preventDefault();
        game.nextRound();
      }}
      placement="modal-bottom"
      size="sm"
      submitLabel="Next round"
      title={`Player ${currentPlayerIndex}/${players?.length}`}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-1">
          {Array.from({ length: maxWork }).map((_, i) => (
            <div
              className={`w-4 h-4 ${i >= remaininWork ? 'bg-amber-100' : 'bg-amber-500'} border-amber-600`}
              key={i}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-row justify-center gap-2">
          <Avatar onClick={() => tool.getMoveTool().execute()} placeholder="Move" />
          <Avatar onClick={() => {}} placeholder="Build" />
        </div>
      </div>
    </Dialog>
  );
};

export default PlayerDialog;
