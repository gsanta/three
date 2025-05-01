import { Box3, Object3D, Ray, Raycaster, Vector2, Vector3 } from 'three';
import SceneStore from '../ui/scene/SceneStore';
import BlockStore from '../stores/block/BlockStore';
import MeshWrapper from '../models/MeshWrapper';
import BlockData from '../models/block/BlockData';
import IntersectionOptions from '../ui/scene/service/IntersectionOptions';
import Num3 from '../models/math/Num3';
import BlockPartLookupData from '../models/block/part/BlockPartLookupData';

export type MeshIntersection = {
  distance: number;
  point: Num3;
  object: {
    boungingBox?: {
      center: Num3;
    };
  };
};

export type BlockIntersection = {
  meshes: MeshIntersection[];
  block: BlockData;
  partIndex?: string;
  partInfo?: BlockPartLookupData;
};

class IntersectMesh {
  constructor(blockStore: BlockStore, sceneStore: SceneStore) {
    this.blockStore = blockStore;
    this.sceneStore = sceneStore;
  }

  calculateForMesh(
    meshes: Object3D[],
    clientX: number,
    clientY: number,
    options?: IntersectionOptions,
  ): [BlockIntersection[], Ray] {
    const raycaster = new Raycaster();

    const realMeshes: Object3D[] = [];

    meshes.forEach((mesh) => realMeshes.push(...new MeshWrapper(mesh).getLeafs()));

    const pointer = new Vector2();
    const { height, width, left, top } = this.sceneStore.getCanvasElement().getBoundingClientRect();
    pointer.x = ((clientX - left) / width) * 2 - 1;
    pointer.y = -((clientY - top) / height) * 2 + 1;

    raycaster.setFromCamera(pointer, this.sceneStore.getCamera());

    const intersects = raycaster.intersectObjects(realMeshes, false);

    const blockIntersections = intersects.map((meshIntersect): BlockIntersection => {
      const block = this.blockStore.getBlock(meshIntersect.object.userData.modelId);
      const partIndex = 'a';

      const meshIntersection: MeshIntersection = {
        distance: meshIntersect.distance,
        point: meshIntersect.point.toArray(),
        object: {},
      };

      if (options?.withBoundingBox) {
        const bbox = new Box3().setFromObject(meshIntersect.object);
        const center = new Vector3();
        bbox.getCenter(center);

        const worldPos = new Vector3();

        meshIntersect.object.getWorldPosition(worldPos);

        meshIntersection.object.boungingBox = {
          center: center.toArray(),
        };
      }

      return {
        meshes: [meshIntersection],
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

  calculateForBlock(
    blocks: string[],
    clientX: number,
    clientY: number,
    options?: IntersectionOptions,
  ): [BlockIntersection[], Ray] {
    const meshes = blocks.map((blockId) => this.sceneStore.getObj3d(blockId));

    return this.calculateForMesh(meshes, clientX, clientY, options);
  }

  private blockStore: BlockStore;

  private sceneStore: SceneStore;
}

export default IntersectMesh;
