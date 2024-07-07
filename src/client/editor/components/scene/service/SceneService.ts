import { Object3D, Ray } from 'three';
import { BlockIntersection } from '../../../use_cases/IntersectMesh';
import IntersectionOptions from './IntersectionOptions';

interface SceneService {
  uuid(): string;

  intersection(
    blocks: string[],
    clientX: number,
    clientY: number,
    options?: IntersectionOptions,
  ): [BlockIntersection[], Ray];
  intersection(
    meshes: Object3D[],
    clientX: number,
    clientY: number,
    options?: IntersectionOptions,
  ): [BlockIntersection[], Ray];
}

export default SceneService;
