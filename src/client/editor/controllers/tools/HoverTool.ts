import { store } from '@/client/common/utils/store';
import { hover } from '../../stores/block/blockSlice';
import Tool, { ToolInfo } from '../../types/Tool';
import { Object3D, Object3DEventMap } from 'three';
import SceneStore from '../../components/scene/SceneStore';
import SceneService from '../../components/scene/SceneService';
import { IconName } from '@/client/common/components/icon/Icon';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import ToolName from '../../types/ToolName';
import Block from '../../types/Block';

abstract class HoverTool extends Tool {
  constructor(
    blockStore: BlockStore,
    sceneService: SceneService,
    sceneStore: SceneStore,
    update: TransactionService,
    name: ToolName,
    iconName?: IconName,
  ) {
    super(blockStore, update, name, iconName);

    this.sceneService = sceneService;
    this.sceneStore = sceneStore;
  }

  onPointerEnter(info: ToolInfo) {
    const block = this.store.getBlocks()[info.eventObject?.userData.modelId || ''];

    if (info.eventObject?.name === 'plane') {
      store.dispatch(hover(undefined));
    } else if (block) {
      store.dispatch(hover({ block: block.id, partIndex: info.partIndex }));
    }
  }

  protected checkPartIntersection(block: Block, mesh: Object3D<Object3DEventMap>, clientX: number, clientY: number) {
    const [intersects] = this.sceneService.intersection(mesh, clientX, clientY);

    const partName = intersects
      ?.map((intersection) => intersection.object.name)
      .find((name) => name && name !== 'root');

    if (partName) {
      return Object.entries(block.partDetails).find(([, val]) => val?.name === partName)?.[0];
    }

    return undefined;
  }

  protected sceneService: SceneService;

  private sceneStore: SceneStore;
}

export default HoverTool;
