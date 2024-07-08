import Tool, { ToolInfo } from '../../types/Tool';
import SceneService from '../../components/scene/service/SceneService';
import { IconName } from '@/client/common/components/icon/Icon';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import ToolName from '../../types/ToolName';
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
      this.hover.hover(block.id, info.partIndex);
    }
  }

  protected checkPartIntersection(blockId: string, clientX: number, clientY: number) {
    const [intersects] = this.sceneService.intersection([blockId], clientX, clientY);

    const blockIntersection = intersects.find(
      (intersection) => intersection.partIndex && intersection.partInfo?.name !== 'root',
    );

    if (blockIntersection) {
      return blockIntersection.partIndex;
    }

    return undefined;
  }

  private hover: Hover;

  protected sceneService: SceneService;
}

export default HoverTool;
