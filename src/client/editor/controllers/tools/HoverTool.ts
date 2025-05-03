import Tool, { ToolInfo } from '../../models/tool/Tool';
import SceneService from '../../ui/scene/service/SceneService';
import { IconName } from '@/client/common/components/lib/Icon';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import ToolName from '../../models/tool/ToolName';
import Hover from '../../use_cases/select/Hover';

abstract class HoverTool extends Tool {
  constructor(
    blockStore: BlockStore,
    sceneService: SceneService,
    update: TransactionService,
    name: ToolName,
    iconName?: IconName,
  ) {
    super(blockStore, update, name, iconName);

    this.hover = new Hover(blockStore, update);
    this.sceneService = sceneService;
  }

  onPointerEnter(info: ToolInfo) {
    const block = this.blockStore.getBlocks()[info.eventObject?.userData.modelId || ''];

    if (info.eventObject?.name === 'plane') {
      this.hover.unhover();
    } else if (block) {
      this.hover.hover(block.id, info.partName);
    }
  }

  private hover: Hover;

  protected sceneService: SceneService;
}

export default HoverTool;
