import UpdateService from '@/client/editor/services/update/UpdateService';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import Block from '@/client/editor/types/Block';
import Num3 from '@/client/editor/types/Num3';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Box3 } from 'three';

class BaseMover {
  constructor(updateService: UpdateService, sceneStore: SceneStore, toolStore: ToolStore) {
    this.updateService = updateService;
    this.sceneStore = sceneStore;
    this.toolStore = toolStore;
  }

  move(block: Block, drag: Num3, dragDelta: Num3): Num3 {
    if (block.slotTarget) {
      const { blockId: targetBlockId, slotName } = block.slotTarget;

      const sourceMesh = this.sceneStore.getObj3d(block.id);

      const targetMesh = this.sceneStore.getObj3d(targetBlockId);
      const targetPartMesh = MeshUtils.findByName(targetMesh, slotName);

      const sourceBoundingBox = new Box3().setFromObject(sourceMesh);
      const targetBoundingBox = new Box3().setFromObject(targetPartMesh);

      const finalDrag = [...drag] as Num3;

      // if (prevDrag[0] < drag[0]) {
      const width = sourceBoundingBox.max.x - sourceBoundingBox.min.x;
      const depth = sourceBoundingBox.max.z - sourceBoundingBox.min.z;
      if (sourceBoundingBox.max.x + dragDelta[0] > targetBoundingBox.max.x) {
        const x = targetBoundingBox.max.x - width / 2 - block.position[0];

        finalDrag[0] = x;
      } else if (sourceBoundingBox.min.x + dragDelta[0] < targetBoundingBox.min.x) {
        const x = targetBoundingBox.min.x + width / 2 - block.position[0];

        finalDrag[0] = x;
      }

      if (sourceBoundingBox.max.z + dragDelta[2] > targetBoundingBox.max.z) {
        const z = targetBoundingBox.max.z - depth / 2 - block.position[2];

        finalDrag[2] = z;
      } else if (sourceBoundingBox.min.z + dragDelta[2] < targetBoundingBox.min.z) {
        const z = targetBoundingBox.min.z + depth / 2 - block.position[2];

        finalDrag[2] = z;
      }

      return finalDrag;
    }

    return drag;
  }

  private sceneStore: SceneStore;

  private toolStore: ToolStore;

  private updateService: UpdateService;
}

export default BaseMover;
