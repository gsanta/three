import { Intersection, Object3D } from 'three';

interface SceneService {
  intersection(mesh: Object3D, clientX: number, clientY: number): Intersection<Object3D>[] | undefined;
}

export default SceneService;
