import { Intersection, Object3D, Ray } from 'three';

interface SceneService {
  uuid(): string;
  intersection(mesh: Object3D, clientX: number, clientY: number): [Intersection<Object3D>[] | undefined, Ray];
}

export default SceneService;
