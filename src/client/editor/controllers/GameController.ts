import { Store } from '@/client/common/utils/store';
import BlockStore from '../stores/block/BlockStore';
import { selectPlayer } from '../stores/game/gameActions';
import GameStore from '../stores/game/GameStore';
import CalculateReachableGrids from '../use_cases/grid/CalculateReachableGrids';
import GridStore from '../stores/grid/GridStore';
import { setSelectedTool } from '../stores/tool/toolSlice';
import ToolName from '../models/tool/ToolName';
import SceneStore from '../ui/scene/SceneStore';
import { Box3, Vector3 } from 'three';

class GameController {
  constructor(
    blockStore: BlockStore,
    gameStore: GameStore,
    gridStore: GridStore,
    sceneStore: SceneStore,
    store: Store,
  ) {
    this.blockStore = blockStore;
    this.gameStore = gameStore;
    this.sceneStore = sceneStore;
    this.store = store;

    this.calculateReachableGrids = new CalculateReachableGrids(gridStore);
  }

  selectNextPlayer() {
    const currentPlayer = this.gameStore.getCurrentPlayer();
    const players = this.gameStore.getPlayers();

    const nextPlayerIndex = currentPlayer === players[players.length - 1] ? 0 : players.indexOf(currentPlayer) + 1;

    const nextPlayerId = players[nextPlayerIndex];
    const nextPlayer = this.blockStore.getBlock(nextPlayerId);

    const reachableGrids = this.calculateReachableGrids.execute(nextPlayer);

    const object = this.sceneStore.getObj3d(nextPlayer.id);
    const box = new Box3().setFromObject(object);
    const center = box.getCenter(new Vector3());

    this.sceneStore.getOrbitControls().target.copy(center);
    this.sceneStore.getOrbitControls().update();

    this.sceneStore.getCanvasState();

    this.store.dispatch(selectPlayer(nextPlayer, reachableGrids));
  }

  startGame() {
    const players = this.gameStore.getPlayers();

    const nextPlayer = this.blockStore.getBlock(players[0]);

    const reachableGrids = this.calculateReachableGrids.execute(nextPlayer);

    this.store.dispatch(selectPlayer(nextPlayer, reachableGrids));
    this.store.dispatch(setSelectedTool(ToolName.Move));
  }

  private blockStore: BlockStore;

  private gameStore: GameStore;

  private sceneStore: SceneStore;

  private store: Store;

  private calculateReachableGrids: CalculateReachableGrids;
}

export default GameController;
