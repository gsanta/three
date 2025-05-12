import { Object3D, Ray, Vector3 } from 'three';
import { BlockIntersection } from '../../../use_cases/IntersectMesh';
import IntersectionOptions from './IntersectionOptions';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';

type MeshRenderedCallback = (blockId: string) => void;

abstract class SceneService {
  uuid(_blockType: BlockConstantData): string {
    throw new Error('Not implemented');
  }

  intersection(
    blocks: string[],
    clientX: number,
    clientY: number,
    options?: IntersectionOptions,
  ): [BlockIntersection[], Ray];
  intersection(
    _meshes: Object3D[] | string[],
    _clientX: number,
    _clientY: number,
    _options?: IntersectionOptions,
  ): [BlockIntersection[], Ray] {
    throw new Error('Not implemented');
  }

  worldToScreen(_object: Object3D): Vector3 {
    throw new Error('Not implemented');
  }

  private meshRenderedListeners: MeshRenderedCallback[] = [];

  subscribeMeshRendered(callback: MeshRenderedCallback) {
    this.meshRenderedListeners.push(callback);

    return () => {
      this.meshRenderedListeners = this.meshRenderedListeners.filter((cb) => cb !== callback);
    };
  }

  onMeshRendered(blockId: string) {
    for (const callback of this.meshRenderedListeners) {
      callback(blockId);
    }
  }
}

export default SceneService;
