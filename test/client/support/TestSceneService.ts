/* eslint-disable @typescript-eslint/no-unused-vars */
import SceneService from '@/client/editor/components/scene/SceneService';
import { Object3D, Object3DEventMap, Intersection, Ray } from 'three';

class TestSceneService implements SceneService {
  intersection(_mesh: Object3D<Object3DEventMap>, _clientX: number, _clientY: number) {
    return this.intersect;
  }

  setIntersection(intersect: Intersection<Object3D<Object3DEventMap>>[] | undefined) {
    this.intersect = intersect;
  }

  private intersect?: Intersection<Object3D<Object3DEventMap>>[];
}

export default TestSceneService;
