import { Object3D, Object3DEventMap } from 'three';
import SceneService from '../../../scene/SceneService';
import SceneStore from '../../../scene/SceneStore';
import BlockStore from '../../BlockStore';
import Block from '@/client/editor/types/Block';
import Edit from '../../services/update/Edit';

class Selector {
  constructor(blockStore: BlockStore, scene: SceneService, sceneStore: SceneStore) {
    this.blockStore = blockStore;
    this.scene = scene;
    this.sceneStore = sceneStore;
  }

  select(edit: Edit, blockId: string, clientX: number, clientY: number) {
    const mesh = this.sceneStore.getObj3d(blockId);

    if (!mesh) {
      return;
    }

    const block = this.blockStore.getBlocks()[blockId];

    const partName = this.checkPartIntersection(mesh, clientX, clientY);

    if (partName) {
      edit.select(block.id, partName);
      return;
    }

    const isMovable = this.checkIsBlockMoveable(block);

    if (isMovable) {
      edit.select(block.id);
      return;
    }

    const selectedBlock = block.parent ? block.parent : block.id;

    if (selectedBlock) {
      edit.select(selectedBlock);

      const parent = this.blockStore.getBlocks()[selectedBlock];

      parent.children.forEach((child) => edit.select(child));
    }
  }

  private checkPartIntersection(mesh: Object3D<Object3DEventMap>, clientX: number, clientY: number) {
    const [intersects] = this.scene.intersection(mesh, clientX, clientY);

    return intersects?.map((intersection) => intersection.object.name).find((name) => name && name !== 'root');
  }

  private checkIsBlockMoveable(block: Block) {
    const slotTarget = block.slotTarget;
    if (slotTarget) {
      const targetBlock = this.blockStore.getBlock(slotTarget.blockId);
      const template = this.blockStore.getBlockTemplatesByName(targetBlock.name);

      const slotTargetPart = template?.parts.find((part) => part.name === slotTarget.slotName);
      if (slotTargetPart?.slot?.allowMovement) {
        return true;
      }
    }

    return false;
  }

  private blockStore: BlockStore;

  private scene: SceneService;

  private sceneStore: SceneStore;
}

export default Selector;
