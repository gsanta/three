import { ToolInfo } from '../../models/tool/Tool';
import ToolName from '../../models/tool/ToolName';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../ui/scene/service/SceneService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import GridStore from '../../stores/grid/GridStore';
import GameStore from '../../stores/game/GameStore';
import GridPathBuilder from '../../use_cases/grid/GridPathBuilder';
import WorldPositionPathBuilder from '../../use_cases/grid/WorldPositionPathBuilder';
import Grid from '../../models/Grid';
import Vector from '../../models/math/Vector';

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
    this.gridStore = gridStore;
    this.grid = new Grid(gridStore);

    this.pathBuilder = new WorldPositionPathBuilder(new GridPathBuilder(this.gridStore), this.gridStore);
  }

  execute() {
    const currentPlayer = this.gameStore.getCurrentPlayer();

    const playerDecorator = this.blockStore.getDecorator<'players'>('players', currentPlayer);

    const currentMovementPath = playerDecorator?.currentMovementPath;

    if (!currentPlayer || !currentMovementPath) {
      return;
    }

    const fullPath = [...currentMovementPath.path, currentMovementPath.lastNode];

    let destinationIndex = fullPath.length - 1;
    let isPathFinished = true;

    for (let i = 0; i < fullPath.length - 1; i++) {
      if (fullPath[i + 1].cost > playerDecorator.remainingWork) {
        destinationIndex = i;
        isPathFinished = false;
        break;
      }
    }

    const xz = this.grid.gridToWorldPos(fullPath[destinationIndex].gridIndex);

    this.transaction
      .createTransaction()
      .update(
        currentPlayer,
        {
          position: Vector.fromXZ(xz, 0).get(),
        },
        {
          type: 'players',
          data: {
            currentMovementPath: isPathFinished ? undefined : currentMovementPath,
            remainingWork: playerDecorator.remainingWork - fullPath[destinationIndex].cost,
          },
        },
      )
      .commit();
  }

  onPointerUp({ gridIndex }: ToolInfo) {
    const currentPlayer = this.gameStore.getCurrentPlayer();

    if (!currentPlayer || gridIndex == null) {
      return;
    }

    const result = this.pathBuilder.build(this.gridStore.getBlockGridIndex(currentPlayer), gridIndex);

    this.transaction
      .createTransaction()
      .updateDecoration(
        'players',
        currentPlayer,
        {
          currentMovementPath: result,
        },
        { arrayMergeStrategy: 'replace' },
      )
      .commit();
  }

  private grid: Grid;

  private gridStore: GridStore;

  private gameStore: GameStore;

  private pathBuilder: WorldPositionPathBuilder;
}

export default MoveTool;
