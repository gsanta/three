/* eslint-disable @typescript-eslint/no-unused-vars */
import SceneService from '@/client/editor/features/scene/SceneService';
import { Object3D, Object3DEventMap, Intersection, Ray } from 'three';

class TestSceneService implements SceneService {
  intersection(
    _mesh: Object3D<Object3DEventMap>,
    _clientX: number,
    _clientY: number,
  ): [Intersection<Object3D<Object3DEventMap>>[] | undefined, Ray] {
    return [this.intersect, this.ray || new Ray()];
  }

  setIntersection(intersect: Intersection<Object3D<Object3DEventMap>>[] | undefined, ray: Ray) {
    this.intersect = intersect;
    this.ray = ray;
  }

  private intersect?: Intersection<Object3D<Object3DEventMap>>[];

  private ray?: Ray;
}

export default TestSceneService;
