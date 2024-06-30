import { store } from '@/client/common/utils/store';
import { hover } from '../../stores/block/blockSlice';
import Tool, { ToolInfo } from '../../types/Tool';
import SceneService from '../../components/scene/SceneService';
import { IconName } from '@/client/common/components/icon/Icon';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import ToolName from '../../types/ToolName';

abstract class HoverTool extends Tool {
  constructor(
    blockStore: BlockStore,
    sceneService: SceneService,
    update: TransactionService,
    name: ToolName,
    iconName?: IconName,
  ) {
    super(blockStore, update, name, iconName);

    this.sceneService = sceneService;
  }

  onPointerEnter(info: ToolInfo) {
    const block = this.blockStore.getBlocks()[info.eventObject?.userData.modelId || ''];

    if (info.eventObject?.name === 'plane') {
      store.dispatch(hover(undefined));
    } else if (block) {
      store.dispatch(hover({ block: block.id, partIndex: info.partIndex }));
    }
  }

  protected checkPartIntersection(blockId: string, clientX: number, clientY: number) {
    const [intersects] = this.sceneService.blockIntersection([blockId], clientX, clientY);

    const blockIntersection = intersects.find(
      (intersection) => intersection.partIndex && intersection.partName !== 'root',
    );

    if (blockIntersection) {
      return blockIntersection.partIndex;
    }

    return undefined;
  }

  protected sceneService: SceneService;
}

export default HoverTool;
