import { ToolInfo } from '../../models/tool/Tool';
import ToolName from '../../models/tool/ToolName';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../ui/scene/service/SceneService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import CableDrawingService from '../../services/CableDrawingService';

class UndergroundCableTool extends HoverTool {
  constructor(
    block: BlockStore,
    cableDrawingService: CableDrawingService,
    sceneService: SceneService,
    transaction: TransactionService,
  ) {
    super(block, sceneService, transaction, ToolName.UndergroundCable, 'BiNetworkChart');

    this.cableDrawingService = cableDrawingService;

    this.onMeshRendered = this.onMeshRendered.bind(this);
  }

  onDeactivate(): void {
    this.cableDrawingService.cancel();
  }

  onPointerMove(_info: ToolInfo): void {
    // if (info.gridIndex === this.prevGridIndex) {
    //   return;
    // }
    // this.prevGridIndex = info.gridIndex;
    // const [worldX, worldZ] = this.grid.gridToWorldPos(info.gridIndex);
    // const worldPos = new Vector([worldX, this.undergroundDepth, worldZ]);
    // this.drawUndergroundCable?.execute(worldPos);
  }

  onPointerUp(info: ToolInfo): void {
    if (this.cableDrawingService.isDrawing()) {
      this.cableDrawingService.udpate(info.gridIndex);
    } else {
      this.cableDrawingService.start(info.gridIndex);
    }
  }

  private cableDrawingService: CableDrawingService;
}

export default UndergroundCableTool;
