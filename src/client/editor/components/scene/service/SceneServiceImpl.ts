import { Object3D, Ray } from 'three';
import SceneStore from '../SceneStore';
import IntersectMesh, { BlockIntersection } from '../../../use_cases/IntersectMesh';
import SceneService from './SceneService';
import { v4 as uuidv4 } from 'uuid';
import BlockStore from '../../../stores/block/BlockStore';
import IntersectionOptions from './IntersectionOptions';

class SceneServiceImpl implements SceneService {
  constructor(blockStore: BlockStore, sceneStore: SceneStore) {
    this.intersect = new IntersectMesh(blockStore, sceneStore);
  }

  uuid() {
    return uuidv4();
  }

  intersection(
    meshes: Object3D[],
    clientX: number,
    clientY: number,
    options?: IntersectionOptions,
  ): [BlockIntersection[], Ray];
  intersection(
    blocks: string[],
    clientX: number,
    clientY: number,
    options?: IntersectionOptions,
  ): [BlockIntersection[], Ray];
  intersection(
    blocksOrMeshes: string[] | Object3D[],
    clientX: number,
    clientY: number,
    options?: IntersectionOptions,
  ): [BlockIntersection[], Ray] {
    if (!blocksOrMeshes.length || typeof blocksOrMeshes[0] === 'string') {
      return this.intersect.calculateForBlock(blocksOrMeshes as string[], clientX, clientY, options);
    } else {
      return this.intersect.calculateForMesh(blocksOrMeshes as Object3D[], clientX, clientY, options);
    }
  }

  private intersect: IntersectMesh;
}

export default SceneServiceImpl;
