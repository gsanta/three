/* eslint-disable @typescript-eslint/no-unused-vars */
import IntersectionOptions from '@/client/editor/ui/scene/service/IntersectionOptions';
import SceneService from '@/client/editor/ui/scene/service/SceneService';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import { BlockIntersection } from '@/client/editor/use_cases/IntersectMesh';
import { Object3D, Ray, Vector3 } from 'three';

class Deferred {
  constructor() {
    this.promise = new Promise<void>((resolve) => {
      this.resolveFunc = resolve;
    });
  }

  resolve() {
    this.resolveFunc?.();
  }

  promise: Promise<void>;

  private resolveFunc?: () => void;
}

class TestSceneService implements SceneService {
  worldToScreen(object: Object3D): Vector3 {
    throw new Error('Method not implemented.');
  }

  uuid(blockType: BlockConstantData) {
    if (this.nextUuids[blockType.type]?.length) {
      return this.nextUuids[blockType.type].shift() as string;
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

  setNextUuid(id: string, blockType: string) {
    if (!this.nextUuids[blockType]) {
      this.nextUuids[blockType] = [];
    }

    this.nextUuids[blockType].push(id);
  }

  private intersect: BlockIntersection[] = [];

  private nextUuids: Record<string, string[]> = {};

  private blockTypeCounter: Map<string, number> = new Map();
}

export default TestSceneService;
