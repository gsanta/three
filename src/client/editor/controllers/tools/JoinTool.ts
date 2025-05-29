import { ToolInfo } from '../../models/tool/Tool';
import ToolName from '../../models/tool/ToolName';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../ui/scene/service/SceneService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import BlockCategoryStore from '../../stores/blockCategory/BlockCategoryStore';
import FactoryService from '../../services/factory/FactoryService';
import GridStore from '../../stores/grid/GridStore';
import Grid from '../../models/Grid';

class JoinTool extends HoverTool {
  constructor(
    block: BlockStore,
    blockCategoryStore: BlockCategoryStore,
    factoryService: FactoryService,
    gridStore: GridStore,
    sceneService: SceneService,
    update: TransactionService,
  ) {
    super(block, sceneService, update, ToolName.Join, 'BiJoystick');

    this.blockCategoryStore = blockCategoryStore;
    this.factoryService = factoryService;
    this.gridStore = gridStore;
  }

  onPointerMove(info: ToolInfo): void {
    const selectedId = this.blockCategoryStore.getSelectedRootBlockIds()[0];

    if (!selectedId) {
      return;
    }

    if (info.gridIndex === this.prevGridIndex) {
      return;
    }

    const cable = this.blockStore.getBlock(this.tmpCableId);

    const grid = new Grid(this.gridStore);

    const selectedBlock = this.blockStore.getBlock(selectedId);

    const from = selectedBlock.position;

    const [toX, toZ] = grid.gridToWorldPos(info.gridIndex);

    console.log(this.gridStore.getBlocksAtGridIndex(info.gridIndex));

    const edit = this.transaction.createTransaction();
    if (!cable) {
      this.factoryService.create(edit, 'cable-1', {
        block: {
          id: this.tmpCableId,
        },
        decorations: {
          cables: {
            points: [{ position: from }, { position: [toX, from[1], toZ] }],
          },
        },
      });
    } else {
      edit.updateDecoration(
        'cables',
        cable.id,
        {
          points: [{ position: from }, { position: [toX, from[1], toZ] }],
        },
        { arrayMergeStrategy: 'replace' },
      );
    }
    edit.commit();
  }

  private blockCategoryStore: BlockCategoryStore;

  private factoryService: FactoryService;

  private gridStore: GridStore;

  private prevGridIndex = -1;

  private tmpCableId = 'tmp-cable-id';
}

export default JoinTool;
