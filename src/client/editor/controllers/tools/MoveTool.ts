import { ToolInfo } from '../../models/tool/Tool';
import ToolName from '../../models/tool/ToolName';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../ui/scene/service/SceneService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import Grid from '../../models/Grid';
import GridStore from '../../stores/grid/GridStore';
import GameStore from '../../stores/game/GameStore';
import Dijkstra from '../../use_cases/grid/Dijkstra';
import { setCurrentMovementPath } from '../../stores/grid/gridSlice';
import { store } from '@/client/common/utils/store';
import GridPathBuilder from '../../use_cases/grid/GridPathBuilder';

class MoveTool extends HoverTool {
  constructor(
    block: BlockStore,
    gameStore: GameStore,
    gridStore: GridStore,
    sceneService: SceneService,
    transaction: TransactionService,
  ) {
    super(block, sceneService, transaction, ToolName.Move, 'BiMove');

    this.gameStore = gameStore;
    this.grid = new Grid(gridStore);
    this.gridStore = gridStore;

    this.dijkstra = new Dijkstra();

    this.pathBuilder = new GridPathBuilder(this.gridStore);
  }

  onPointerUp({ gridIndex }: ToolInfo) {
    const currentPlayer = this.gameStore.getCurrentPlayer();

    if (!currentPlayer || gridIndex == null || !this.gameStore.getReachableGrids()[gridIndex]) {
      return;
    }

    // const edit = this.transaction.createTransaction();

    // const currentPos = this.blockStore.getBlock(currentPlayer).position;
    // const [newX, newZ] = this.grid.gridToWorldPos(gridIndex);

    const result = this.pathBuilder.build(this.gridStore.getBlockGridIndex(currentPlayer), gridIndex);

    store.dispatch(setCurrentMovementPath(result));

    // edit.updateBlock(currentPlayer, {
    //   position: [newX, currentPos[1], newZ],
    // });

    // edit.commit();
  }

  private dijkstra = new Dijkstra();

  private grid: Grid;

  private gridStore: GridStore;

  private gameStore: GameStore;

  private pathBuilder: GridPathBuilder;
}

export default MoveTool;
