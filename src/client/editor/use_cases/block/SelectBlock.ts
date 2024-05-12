import { Object3D, Object3DEventMap } from 'three';
import SceneService from '../../components/scene/SceneService';
import SceneStore from '../../components/scene/SceneStore';
import BlockStore from '../../stores/block/BlockStore';
import Block from '@/client/editor/types/Block';
import Edit from '../../services/update/Edit';
import { store } from '@/client/common/utils/store';
import { updateSelectTool } from '../../stores/tool/toolSlice';

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
      edit.select(null);
      edit.select(block.id, partName);
      store.dispatch(updateSelectTool({ moveAxis: block.moveAxis }));
      return;
    }

    const isMovable = this.checkIsBlockMoveable(block);

    if (isMovable) {
      edit.select(block.id);
      store.dispatch(updateSelectTool({ moveAxis: block.moveAxis }));
      return;
    }

    const selectedBlock = block.parent ? block.parent : block.id;

    if (selectedBlock) {
      edit.select(selectedBlock);

      const parent = this.blockStore.getBlocks()[selectedBlock];

      parent.children.forEach((child) => edit.select(child));

      store.dispatch(updateSelectTool({ moveAxis: parent.moveAxis }));
    }
  }

  private checkPartIntersection(mesh: Object3D<Object3DEventMap>, clientX: number, clientY: number) {
    const intersects = this.scene.intersection(mesh, clientX, clientY);

    return intersects?.map((intersection) => intersection.object.name).find((name) => name && name !== 'root');
  }

  private checkIsBlockMoveable(block: Block) {
    const slotTarget = block.slotTarget;
    if (slotTarget) {
      const targetBlock = this.blockStore.getBlock(slotTarget.blockId);
      const template = this.blockStore.getTemplateByName(targetBlock.name);

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
