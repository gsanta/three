/* eslint-disable @typescript-eslint/no-unused-vars */
import IntersectionOptions from '@/client/editor/components/scene/service/IntersectionOptions';
import SceneService from '@/client/editor/components/scene/service/SceneService';
import BlockType from '@/client/editor/types/BlockType';
import { BlockIntersection } from '@/client/editor/use_cases/IntersectMesh';
import { Object3D, Ray } from 'three';

class TestSceneService implements SceneService {
  uuid(blockType: BlockType) {
    const id = this.nextUuid;
    this.nextUuid = '';

    if (id) {
      return id;
    }

    let count = this.blockTypeCounter.get(blockType.type) || 0;
    count += 1;
    this.blockTypeCounter.set(blockType.type, count);

    return `${blockType.type}-${count}`;
  }

  intersection(
    _blocks: string[],
    _clientX: number,
    _clientY: number,
    _options?: IntersectionOptions,
  ): [BlockIntersection[], Ray];
  intersection(
    _objects: Object3D[],
    _clientX: number,
    _clientY: number,
    _options?: IntersectionOptions,
  ): [BlockIntersection[], Ray];
  intersection(
    _blocks: string[] | Object3D[],
    _clientX: number,
    _clientY: number,
    _options?: IntersectionOptions,
  ): [BlockIntersection[], Ray] {
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

  private blockTypeCounter: Map<string, number> = new Map();
}

export default TestSceneService;
