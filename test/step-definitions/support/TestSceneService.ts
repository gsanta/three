/* eslint-disable @typescript-eslint/no-unused-vars */
import SceneService from '@/client/editor/components/scene/SceneService';
import { Object3D, Object3DEventMap, Intersection, Ray } from 'three';
import { v4 as uuidv4 } from 'uuid';

class TestSceneService implements SceneService {
  uuid() {
    const id = this.nextUuid;
    this.nextUuid = '';
    return id || uuidv4();
  }

  intersection(
    _mesh: Object3D<Object3DEventMap>,
    _clientX: number,
    _clientY: number,
  ): [Intersection<Object3D>[] | undefined, Ray] {
    return [this.intersect, new Ray()];
  }

  setIntersection(intersect: Intersection<Object3D<Object3DEventMap>>[] | undefined) {
    this.intersect = intersect;
  }

  setUuid(id: string) {
    this.nextUuid = id;
  }

  private intersect?: Intersection<Object3D<Object3DEventMap>>[];

  private nextUuid: string = '';
}

export default TestSceneService;
