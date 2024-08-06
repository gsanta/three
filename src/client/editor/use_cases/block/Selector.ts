import { Vector3 } from 'three';
import SceneService from '../../components/scene/service/SceneService';
import SceneStore from '../../components/scene/SceneStore';
import BlockStore from '../../stores/block/BlockStore';
import Block from '@/client/editor/types/Block';
import { store } from '@/client/common/utils/store';
import { updateSelectTool } from '../../stores/tool/toolSlice';
import TransactionService from '../../services/transaction/TransactionService';

class Selector {
  constructor(blockStore: BlockStore, scene: SceneService, sceneStore: SceneStore, updateService: TransactionService) {
    this.blockStore = blockStore;
    this.scene = scene;
    this.sceneStore = sceneStore;
    this.updateService = updateService;
  }

  select(blockId: string | undefined, clientX: number, clientY: number) {
    if (blockId) {
      const block = this.blockStore.getBlocks()[blockId];
      this.selectBlock(block, clientX, clientY);
    } else {
      this.updateService.getTransaction().select(null).commit();
    }
  }

  private selectBlock(block: Block, clientX: number, clientY: number) {
    const mesh = this.sceneStore.getObj3d(block.id);

    if (!mesh) {
      return;
    }

    const pos = new Vector3();
    mesh.getWorldPosition(pos);

    const edit = this.updateService.getTransaction();

    const partIndex = this.checkPartIntersection(block, clientX, clientY);

    if (partIndex) {
      edit.select(null);
      edit.select(block.id, partIndex);
      store.dispatch(updateSelectTool({ moveAxis: block.moveAxis }));
    } else {
      edit.select(block.id, '#1');

      store.dispatch(updateSelectTool({ moveAxis: block.moveAxis }));
    }

    edit.commit();
  }

  private checkPartIntersection(block: Block, clientX: number, clientY: number) {
    const [intersects] = this.scene.intersection([block.id], clientX, clientY);

    // TODO find a better solution to skip non-selectable parts
    const blockIntersection = intersects.find(
      (intersection) => intersection.partIndex && intersection.partInfo?.name !== 'root',
    );

    if (blockIntersection) {
      return blockIntersection.partIndex;
    }

    return undefined;
  }

  private blockStore: BlockStore;

  private scene: SceneService;

  private sceneStore: SceneStore;

  private updateService: TransactionService;
}

export default Selector;
