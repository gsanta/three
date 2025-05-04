import { ToolInfo } from '../../models/tool/Tool';
import ToolName from '../../models/tool/ToolName';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../ui/scene/service/SceneService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import Grid from '../../models/Grid';
import GridStore from '../../stores/grid/GridStore';

class PlayerTool extends HoverTool {
  constructor(block: BlockStore, gridStore: GridStore, sceneService: SceneService, transaction: TransactionService) {
    super(block, sceneService, transaction, ToolName.Move, 'BiMove');

    this.grid = new Grid(gridStore);
  }

  onPointerUp({ gridIndex }: ToolInfo) {
    const currentPlayer = this.blockStore.getCurrentPlayer();

    if (!currentPlayer || gridIndex == null) {
      return;
    }

    const edit = this.transaction.createTransaction();

    const currentPos = this.blockStore.getBlock(currentPlayer).position;
    const [newX, newZ] = this.grid.gridToWorldPos(gridIndex);

    edit.updateBlock(currentPlayer, {
      position: [newX, currentPos[1], newZ],
    });

    edit.commit();
  }

  private grid: Grid;
}

export default PlayerTool;
