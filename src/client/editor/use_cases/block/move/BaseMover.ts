import SceneStore from '@/client/editor/ui/scene/SceneStore';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import BlockData from '@/client/editor/models/block/BlockData';
import Num3 from '@/client/editor/models/math/Num3';
import MeshWrapper from '@/client/editor/models/MeshWrapper';
import { Box3 } from 'three';

class BaseMover {
  constructor(blockStore: BlockStore, updateService: TransactionService, sceneStore: SceneStore, toolStore: ToolStore) {
    this.blockStore = blockStore;
    this.updateService = updateService;
    this.sceneStore = sceneStore;
    this.toolStore = toolStore;
  }

  move(block: BlockData, drag: Num3, dragDelta: Num3): Num3 {
    if (block.parentConnection) {
      const { block: stationBlockId, part: stationPartIndex } = block.parentConnection;
      const sourceMesh = this.sceneStore.getObj3d(block.id);

      const targetBlock = this.blockStore.getBlock(stationBlockId);
      const targetPartName = targetBlock.partDetails[stationPartIndex || '#1']?.name;
      const targetMesh = this.sceneStore.getObj3d(block.parentConnection?.block || '');
      const targetPartMesh = new MeshWrapper(targetMesh).findByName(targetPartName);

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

  private blockStore: BlockStore;

  private sceneStore: SceneStore;

  private toolStore: ToolStore;

  private updateService: TransactionService;
}

export default BaseMover;
