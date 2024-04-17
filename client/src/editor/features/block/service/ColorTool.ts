import { Store } from '@/common/utils/store';
import Tool, { ToolInfo } from '@/editor/services/tool/service/Tool';
import ToolName from '@/editor/services/tool/state/ToolName';
import SceneService from '@/editor/services/scene/SceneService';
import { colorToArray } from '@/editor/services/tool/colorUtils';
import BlockService from './BlockService';

class ColorTool extends Tool {
  constructor(store: Store, scene: SceneService, blockService: BlockService) {
    super(store, ToolName.Color);

    this.scene = scene;
    this.blockService = blockService;
  }

  onPointerDown({ eventObjectName }: ToolInfo) {
    const { blocks } = this.store.getState().blocks.present;
    const block = blocks[eventObjectName];

    if (!block) {
      return;
    }

    const update = this.blockService.updateBlock(eventObjectName, {
      color: colorToArray(this.store.getState().blockSettings.present.color),
    });

    this.blockService.executeUpdate([{ block: update, category: block.category }]);
  }

  private scene: SceneService;

  private blockService: BlockService;
}

export default ColorTool;
