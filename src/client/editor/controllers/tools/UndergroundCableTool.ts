import { ToolInfo } from '../../models/tool/Tool';
import ToolName from '../../models/tool/ToolName';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../ui/scene/service/SceneService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import CableDrawingService from '../../services/CableDrawingService';
import BlockTypeStore from '../../stores/blockType/BlockTypeStore';

class UndergroundCableTool extends HoverTool {
  constructor(
    block: BlockStore,
    blockTypeStore: BlockTypeStore,
    cableDrawingService: CableDrawingService,
    sceneService: SceneService,
    transaction: TransactionService,
  ) {
    super(block, sceneService, transaction, ToolName.UndergroundCable, 'BiNetworkChart');

    this.blockTypeStore = blockTypeStore;

    this.cableDrawingService = cableDrawingService;

    this.onMeshRendered = this.onMeshRendered.bind(this);
  }

  onDeactivate(): void {
    this.cableDrawingService.cancel();
    this.prevGridIndex = -1;
  }

  onPointerDrag(info: ToolInfo): void {
    if (info.gridIndex === this.prevGridIndex) {
      return;
    }
    this.prevGridIndex = info.gridIndex;

    if (this.cableDrawingService.isDrawing()) {
      this.cableDrawingService.udpate(info.gridIndex);
    }

    // const [worldX, worldZ] = this.grid.gridToWorldPos(info.gridIndex);
    // const worldPos = new Vector([worldX, this.undergroundDepth, worldZ]);
    // this.drawUndergroundCable?.execute(worldPos);
  }

  onPointerDown(info: ToolInfo): void {
    const selectedId = this.blockTypeStore.getActiveBlockType();
    const selectedBlock = this.blockStore.getBlock(selectedId);

    if (this.cableDrawingService.isDrawing()) {
      this.cableDrawingService.udpate(info.gridIndex);
    } else {
      this.cableDrawingService.start(selectedBlock, info.gridIndex);
    }
  }

  private prevGridIndex: number = -1;

  private blockTypeStore: BlockTypeStore;

  private cableDrawingService: CableDrawingService;
}

export default UndergroundCableTool;
