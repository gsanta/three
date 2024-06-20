import { Object3D, Object3DEventMap, Vector3 } from 'three';
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

    const partName = this.checkPartIntersection(block, mesh, clientX, clientY);
    const isMovable = this.checkIsBlockMoveable(block);

    if (partName) {
      edit.select(null);
      edit.select(block.id, partName);
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

  private checkPartIntersection(block: Block, mesh: Object3D<Object3DEventMap>, clientX: number, clientY: number) {
    const [intersects] = this.scene.intersection(mesh, clientX, clientY);

    // TODO find a better solution to skip non-selectable parts
    const partName = intersects
      ?.map((intersection) => intersection.object.name)
      .find((name) => name && name !== 'root');

    if (partName) {
      return Object.entries(block.partDetails).find(([, val]) => val?.name === partName)?.[0];
    }

    return undefined;
  }

  private checkIsBlockMoveable(block: Block) {
    const slotTarget = block.slotTarget;
    if (slotTarget) {
      const targetBlock = this.blockStore.getBlock(slotTarget.blockId);
      const template = this.blockStore.getBlockType(targetBlock.type);

      const slotTargetPart = template?.parts.find((part) => part.name === slotTarget.slotName);
      if (block.partDetails[slotTargetPart?.index || '']?.allowMovement) {
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
