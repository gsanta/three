import { Intersection, Object3D, Ray, Raycaster, Vector2 } from 'three';
import SceneStore from '../components/scene/SceneStore';
import BlockStore from '../stores/block/BlockStore';
import BlockUtils from '../utils/BlockUtils';
import MeshUtils from '../utils/MeshUtils';
import Block from '../types/Block';
import { ModelPartInfo } from '../types/BlockType';

export type BlockIntersection = {
  meshes: Intersection<Object3D>[];
  block: Block;
  partIndex?: string;
  partInfo?: ModelPartInfo;
};

class IntersectMesh {
  constructor(blockStore: BlockStore, sceneStore: SceneStore) {
    this.blockStore = blockStore;
    this.sceneStore = sceneStore;
  }

  calculateForMesh(meshes: Object3D[], clientX: number, clientY: number): [BlockIntersection[], Ray] {
    const raycaster = new Raycaster();

    const realMeshes: Object3D[] = [];

    meshes.forEach((mesh) => realMeshes.push(...MeshUtils.getLeafs(mesh)));

    const pointer = new Vector2();
    const { height, width, left, top } = this.sceneStore.getCanvasElement().getBoundingClientRect();
    pointer.x = ((clientX - left) / width) * 2 - 1;
    pointer.y = -((clientY - top) / height) * 2 + 1;

    raycaster.setFromCamera(pointer, this.sceneStore.getCamera());

    const intersects = raycaster.intersectObjects(realMeshes, false);

    const blockIntersections = intersects.map((meshIntersect) => {
      const block = this.blockStore.getBlock(meshIntersect.object.userData.modelId);
      const partIndex = BlockUtils.getPartIndexByName(block, meshIntersect.object.name);
      return {
        meshes: [meshIntersect],
        block: block,
        partIndex,
        partInfo: partIndex ? block.partDetails[partIndex] : undefined,
      };
    });

    const aggregatedBlockIntersections: Map<string, BlockIntersection> = new Map();

    blockIntersections.forEach((intersection) => {
      const key = intersection.block.id + intersection.partIndex;

      if (aggregatedBlockIntersections.get(key)) {
        aggregatedBlockIntersections.get(key)?.meshes.push(intersection.meshes[0]);
      } else {
        aggregatedBlockIntersections.set(key, intersection);
      }
    });

    return [Array.from(aggregatedBlockIntersections.values()), raycaster.ray];
  }

  calculateForBlock(blocks: string[], clientX: number, clientY: number): [BlockIntersection[], Ray] {
    const meshes = blocks.map((blockId) => this.sceneStore.getObj3d(blockId));

    return this.calculateForMesh(meshes, clientX, clientY);
  }

  private blockStore: BlockStore;

  private sceneStore: SceneStore;
}

export default IntersectMesh;
