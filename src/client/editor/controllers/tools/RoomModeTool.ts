import ToolName from '../../types/ToolName';
import BlockStore from '../../stores/block/BlockStore';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../components/scene/service/SceneService';
import { store } from '@/client/common/utils/store';
import { setBuildingMode } from '@/client/editor/stores/editorSlice';
import SetupBuildingMode from '../../use_cases/building_mode/SetupBuildingMode';

class RoomModeTool extends HoverTool {
  constructor(blockStore: BlockStore, sceneService: SceneService, update: TransactionService) {
    super(blockStore, sceneService, update, ToolName.RoomModel, 'BiPlus');

    this.blockStore = blockStore;

    this.setupBuildingMode = new SetupBuildingMode(blockStore, update);
  }

  onPointerUp() {
    const hovered = this.blockStore.getHovered();

    if (hovered?.block) {
      const block = this.blockStore.getBlock(hovered.block);

      if (['walls', 'roofs', 'building-bases'].includes(block.category)) {
        const root = this.blockStore.getRootBlock(block.id);
        store.dispatch(setBuildingMode({ editedBuilding: root.id }));

        this.setupBuildingMode.setup(root);
      }
    }
  }

  private setupBuildingMode: SetupBuildingMode;
}

export default RoomModeTool;