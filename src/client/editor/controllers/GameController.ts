import { Store } from '@/client/common/utils/store';
import BlockStore from '../stores/block/BlockStore';
import { selectPlayer } from '../stores/game/gameActions';
import GameStore from '../stores/game/GameStore';
import CalculateReachableGrids from '../use_cases/grid/CalculateReachableGrids';
import GridStore from '../stores/grid/GridStore';
import { setSelectedTool } from '../stores/tool/toolSlice';
import ToolName from '../models/tool/ToolName';
import SceneStore from '../ui/scene/SceneStore';
import { Box3, Camera, Vector3 } from 'three';
import Serializer from './serializer/Serializer';
import game1 from '../../../examples/game_1.json';
import { SerializedState } from './serializer/SerializedState';
import { setGameState } from '../stores/game/gameSlice';

class GameController {
  constructor(
    blockStore: BlockStore,
    gameStore: GameStore,
    gridStore: GridStore,
    sceneStore: SceneStore,
    serializer: Serializer,
    store: Store,
  ) {
    this.blockStore = blockStore;
    this.gameStore = gameStore;
    this.sceneStore = sceneStore;
    this.serializer = serializer;
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

    // this.sceneStore.getCamera().position.set(center.x, center.y + 30, center.z + 45);
    // this.sceneStore.getOrbitControls().target.set(center.x, center.y, center.z);
    // this.sceneStore.getOrbitControls().update();

    this.slideCameraToLookAtPoint(this.sceneStore.getCamera(), center);

    this.sceneStore.getCanvasState();

    this.store.dispatch(selectPlayer(nextPlayer, reachableGrids));
  }

  startGame() {
    this.serializer.import(game1 as SerializedState);

    const players = this.gameStore.getPlayers();

    const nextPlayer = this.blockStore.getBlock(players[0]);

    const reachableGrids = this.calculateReachableGrids.execute(nextPlayer);

    this.store.dispatch(selectPlayer(nextPlayer, reachableGrids));
    this.store.dispatch(setSelectedTool(ToolName.Move));
    this.store.dispatch(setGameState('started'));
  }

  private slideCameraToLookAtPoint(camera: Camera, point: Vector3) {
    const controls = this.sceneStore.getOrbitControls();

    const offset = new Vector3().subVectors(camera.position, controls.target);

    camera.position.z = point.z + offset.z;
    camera.position.x = point.x - offset.x;

    this.sceneStore.getOrbitControls().target.set(point.x, point.y, point.z);
    this.sceneStore.getOrbitControls().update();
  }

  private blockStore: BlockStore;

  private gameStore: GameStore;

  private sceneStore: SceneStore;

  private serializer: Serializer;

  private store: Store;

  private calculateReachableGrids: CalculateReachableGrids;
}

export default GameController;
