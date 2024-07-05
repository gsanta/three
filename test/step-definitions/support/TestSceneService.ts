/* eslint-disable @typescript-eslint/no-unused-vars */
import SceneService from '@/client/editor/components/scene/SceneService';
import { BlockIntersection } from '@/client/editor/use_cases/IntersectMesh';
import { Object3D, Ray } from 'three';
import { v4 as uuidv4 } from 'uuid';

class TestSceneService implements SceneService {
  uuid() {
    const id = this.nextUuid;
    this.nextUuid = '';
    return id || uuidv4();
  }

  blockIntersection(_blocks: string[], _clientX: number, _clientY: number): [BlockIntersection[], Ray] {
    return [this.intersect, new Ray()];
  }

  meshIntersection(_meshes: Object3D[], _clientX: number, _clientY: number): [BlockIntersection[], Ray] {
    return [this.intersect, new Ray()];
  }

  setIntersection(intersect: BlockIntersection[]) {
    this.intersect = intersect;
  }

  setUuid(id: string) {
    this.nextUuid = id;
  }

  private intersect: BlockIntersection[] = [];

  private nextUuid: string = '';
}

export default TestSceneService;
