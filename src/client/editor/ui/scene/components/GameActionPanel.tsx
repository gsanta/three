import useEditorContext from '@/app/editor/useEditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';

const GameActionPanel = () => {
  const {
    controllers: { game },
  } = useEditorContext();

  const players = useAppSelector((state) => state.game.players);
  const currentPlayer = useAppSelector((state) => state.game.currentPlayer);


  let content: JSX.Element;

  if (currentPlayer === undefined) {
    content = (
      <div className="card-body">
        <h2 className="card-title">Start game</h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => game.startGame()}>
            Start game
          </button>
        </div>
      </div>
    );
  } else {
    const currentPlayerIndex = players.indexOf(currentPlayer) + 1;

    content = (
      <div className="card-body">
        <h2 className="card-title">
          Player {currentPlayerIndex}/{players?.length}
        </h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => game.selectNextPlayer()}>
            Next player
          </button>
        </div>
      </div>
    );
  }

  return <div className="absolute left-[70px] bottom-[50px] card rounded-none bg-base-100 shadow-md">{content}</div>;
};

export default GameActionPanel;
