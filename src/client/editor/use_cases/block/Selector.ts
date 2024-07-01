import { Vector3 } from 'three';
import SceneService from '../../components/scene/SceneService';
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
    const isMovable = this.checkIsBlockMoveable(block);

    if (partIndex) {
      edit.select(null);
      edit.select(block.id, partIndex);
      store.dispatch(updateSelectTool({ moveAxis: block.moveAxis }));
    } else if (isMovable) {
      edit.select(block.id);
      store.dispatch(updateSelectTool({ moveAxis: block.moveAxis }));
      return;
    } else {
      edit.select(block.id);

      store.dispatch(updateSelectTool({ moveAxis: block.moveAxis }));
    }

    edit.commit();
  }

  private checkPartIntersection(block: Block, clientX: number, clientY: number) {
    const [intersects] = this.scene.blockIntersection([block.id], clientX, clientY);

    // TODO find a better solution to skip non-selectable parts
    const blockIntersection = intersects.find(
      (intersection) => intersection.partIndex && intersection.partName !== 'root',
    );

    if (blockIntersection) {
      return blockIntersection.partIndex;
    }

    return undefined;
  }

  private checkIsBlockMoveable(block: Block) {
    const place = block.place;
    if (place) {
      const targetBlock = this.blockStore.getBlock(block.parent);
      const template = this.blockStore.getBlockType(targetBlock.type);

      const targetPart = template?.partDetails[place];
      if (targetPart?.allowMovement) {
        return true;
      }
    }

    return false;
  }

  private blockStore: BlockStore;

  private scene: SceneService;

  private sceneStore: SceneStore;

  private updateService: TransactionService;
}

export default Selector;
