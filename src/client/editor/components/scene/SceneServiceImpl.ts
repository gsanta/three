import { Object3D, Ray } from 'three';
import SceneStore from './SceneStore';
import IntersectMesh, { BlockIntersection } from '../../use_cases/IntersectMesh';
import SceneService from './SceneService';
import { v4 as uuidv4 } from 'uuid';
import BlockStore from '../../stores/block/BlockStore';

class SceneServiceImpl implements SceneService {
  constructor(blockStore: BlockStore, sceneStore: SceneStore) {
    this.intersect = new IntersectMesh(blockStore, sceneStore);
  }

  uuid() {
    return uuidv4();
  }

  blockIntersection(blocks: string[], clientX: number, clientY: number): [BlockIntersection[], Ray] {
    return this.intersect.calculateForBlock(blocks, clientX, clientY);
  }

  meshIntersection(meshes: Object3D[], clientX: number, clientY: number): [BlockIntersection[], Ray] {
    return this.intersect.calculateForMesh(meshes, clientX, clientY);
  }

  private intersect: IntersectMesh;
}

export default SceneServiceImpl;
