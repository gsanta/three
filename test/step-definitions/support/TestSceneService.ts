/* eslint-disable @typescript-eslint/no-unused-vars */
import IntersectionOptions from '@/client/editor/components/scene/service/IntersectionOptions';
import SceneService from '@/client/editor/components/scene/service/SceneService';
import BlockType from '@/client/editor/models/BlockType';
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

  uuid(blockType: BlockType) {
    const id = this.nextUuids.shift();

    if (id !== undefined) {
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

  setNextUuid(id: string) {
    this.nextUuids.push(id);
  }

  waitForRender() {
    this.renderDeferred = new Deferred();
    return this.renderDeferred?.promise || Promise.reject();
  }

  resolveRender() {
    this.renderDeferred?.resolve();
  }

  private renderDeferred?: Deferred;

  private intersect: BlockIntersection[] = [];

  private nextUuids: string[] = [];

  private blockTypeCounter: Map<string, number> = new Map();
}

export default TestSceneService;
