import { ToolInfo } from '../../models/tool/Tool';
import ToolName from '../../models/tool/ToolName';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../ui/scene/service/SceneService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import CableDrawingService from '../../services/CableDrawingService';
import BlockTypeStore from '../../stores/blockType/BlockTypeStore';
import BuildService from '../../services/BuildService';

class CableTool extends HoverTool {
  constructor(
    block: BlockStore,
    blockTypeStore: BlockTypeStore,
    buildService: BuildService,
    cableDrawingService: CableDrawingService,
    sceneService: SceneService,
    transaction: TransactionService,
  ) {
    super(block, sceneService, transaction, ToolName.Cable, 'BiNetworkChart');

    this.blockTypeStore = blockTypeStore;

    this.buildService = buildService;

    this.cableDrawingService = cableDrawingService;

    this.onMeshRendered = this.onMeshRendered.bind(this);
  }

  cancelCableDrawing(): void {
    if (this.cableDrawingService.isDrawing()) {
      this.cableDrawingService.cancel();
    }
  }

  finishCableDrawing(): void {
    if (this.cableDrawingService.isDrawing()) {
      this.cableDrawingService.finish();
    }
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
      const drawInfo = this.cableDrawingService.udpate(info.gridIndex);

      if (drawInfo?.finishable) {
        this.buildService.setIsEditing({ cancelable: true, finishable: true });
      }
    }
  }

  onPointerDown(info: ToolInfo): void {
    const selectedId = this.blockTypeStore.getAddAction()?.blockType;
    const selectedBlock = this.blockStore.getBlock(selectedId);

    if (this.cableDrawingService.isDrawing()) {
      this.cableDrawingService.udpate(info.gridIndex);
    } else {
      const didStart = this.cableDrawingService.start(selectedBlock, info.gridIndex);
      if (didStart) {
        this.buildService.setIsEditing({ cancelable: true, finishable: false });
      }
    }
  }

  private prevGridIndex: number = -1;

  private blockTypeStore: BlockTypeStore;

  private buildService: BuildService;

  private cableDrawingService: CableDrawingService;
}

export default CableTool;
