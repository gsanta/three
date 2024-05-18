import { Intersection, Object3D, Ray } from 'three';
import SceneStore from './SceneStore';
import IntersectMesh from '../../use_cases/IntersectMesh';
import SceneService from './SceneService';

class SceneServiceImpl implements SceneService {
  constructor(sceneStore: SceneStore) {
    this.intersect = new IntersectMesh(sceneStore);
  }

  intersection(mesh: Object3D, clientX: number, clientY: number): [Intersection<Object3D>[] | undefined, Ray] {
    return this.intersect.calculate(mesh, clientX, clientY);
  }

  private intersect: IntersectMesh;
}

export default SceneServiceImpl;
