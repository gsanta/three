import { Object3D, Ray } from 'three';
import { BlockIntersection } from '../../use_cases/IntersectMesh';

interface SceneService {
  uuid(): string;
  blockIntersection(blocks: string[], clientX: number, clientY: number): [BlockIntersection[], Ray];
  meshIntersection(meshes: Object3D[], clientX: number, clientY: number): [BlockIntersection[], Ray];
}

export default SceneService;
