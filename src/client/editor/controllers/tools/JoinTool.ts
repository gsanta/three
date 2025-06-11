import { ToolEventName, ToolInfo } from '../../models/tool/Tool';
import ToolName from '../../models/tool/ToolName';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../ui/scene/service/SceneService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import BlockCategoryStore from '../../stores/blockCategory/BlockCategoryStore';
import GridStore from '../../stores/grid/GridStore';
import Grid from '../../models/Grid';
import CableConnector, { ConnectCable } from '../../services/CableConnector';

class JoinTool extends HoverTool {
  constructor(
    block: BlockStore,
    blockCategoryStore: BlockCategoryStore,
    cableConnector: CableConnector,
    gridStore: GridStore,
    sceneService: SceneService,
    update: TransactionService,
  ) {
    super(block, sceneService, update, ToolName.Join, 'BiJoystick');

    this.blockCategoryStore = blockCategoryStore;
    this.cableConnector = cableConnector;
    this.gridStore = gridStore;

    this.onMeshRendered = this.onMeshRendered.bind(this);
  }

  onActivate(): void {
    const selectedId = this.blockCategoryStore.getSelectedRootBlockIds()[0];

    if (selectedId) {
      const selectedBlock = this.blockStore.getBlock(selectedId);

      this.connector = this.cableConnector.getConnector(selectedBlock);
    }
  }

  onDeactivate(): void {
    this.connector?.cancel();
    this.connector = undefined;
  }

  onPointerMove(info: ToolInfo): void {
    const selectedId = this.blockCategoryStore.getSelectedRootBlockIds()[0];

    if (!selectedId || !this.connector || info.gridIndex === this.prevGridIndex) {
      return;
    }

    this.prevGridIndex = info.gridIndex;

    const grid = new Grid(this.gridStore);

    const selectedBlock = this.blockStore.getBlock(selectedId);

    const from = selectedBlock.position;

    const [toX, toZ] = grid.gridToWorldPos(info.gridIndex);

    const toBlocks = this.gridStore.getBlocksAtGridIndex(info.gridIndex);

    this.connector.update(toBlocks, [toX, from[1], toZ]);
  }

  onPointerUp(info: ToolInfo): void {
    if (!info.isDragHappened) {
      this.connector?.finalize();
      this.connector = undefined;
    }
  }

  onMeshRendered(name: ToolEventName): void {
    if (name === 'onPointerMove') {
      this.connector?.meshRendered();
    }
  }

  private connector: ConnectCable | undefined;

  private blockCategoryStore: BlockCategoryStore;

  private cableConnector: CableConnector;

  private gridStore: GridStore;

  private prevGridIndex = -1;
}

export default JoinTool;
