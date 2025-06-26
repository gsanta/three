import useEditorContext from '@/app/editor/useEditorContext';
import Avatar from '@/client/common/components/lib/Avatar';
import { useAppSelector } from '@/client/common/hooks/hooks';
import useDialog from '../../hooks/useDialog';
import AddDialog from './AddDialog';

const GameActionPanel = () => {
  const {
    controllers: { game },
  } = useEditorContext();

  const players = useAppSelector((state) => state.game.players);
  const currentPlayer = useAppSelector((state) => state.game.currentPlayer);

  const currentPlayerIndex = currentPlayer ? players.indexOf(currentPlayer) + 1 : undefined;

  const { onDialogOpen: onAddDialogOpen } = useDialog({ dialogId: 'add-dialog' });

  return (
    <div className="card rounded-none bg-base-100 shadow-md">
      <div className="card-body">
        <div className="flex gap-2">
          <Avatar onClick={onAddDialogOpen} placeholder="Add" />
          {currentPlayer === undefined && <Avatar onClick={() => game.startGame()} placeholder="Start" />}
          {currentPlayer && (
            <>
              <h2 className="card-title">
                Player {currentPlayerIndex}/{players?.length}
              </h2>
              <div className="card-actions justify-end">
                <Avatar onClick={() => game.selectNextPlayer()} placeholder="Next player" />
              </div>
            </>
          )}
        </div>
      </div>
      <AddDialog />
    </div>
  );
};

export default GameActionPanel;
