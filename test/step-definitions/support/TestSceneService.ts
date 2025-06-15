/* eslint-disable @typescript-eslint/no-unused-vars */
import IntersectionOptions from '@/client/editor/ui/scene/service/IntersectionOptions';
import SceneService from '@/client/editor/ui/scene/service/SceneService';
import BlockConstantData, { BlockTypeName } from '@/client/editor/models/block/BlockConstantData';
import { BlockIntersection } from '@/client/editor/use_cases/IntersectMesh';
import { Object3D, Ray, Vector3 } from 'three';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import BlockData from '@/client/editor/models/block/BlockData';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import { BlockUpdate } from '@/client/editor/stores/block/blockSlice.types';

class TestSceneService extends SceneService {
  constructor(blockStore: BlockStore, transactionService: TransactionService) {
    super();
    this.blockStore = blockStore;
    this.transactionService = transactionService;
  }

  worldToScreen(_object: Object3D): Vector3 {
    throw new Error('Method not implemented.');
  }

  uuid(blockType: BlockConstantData) {
    if (this.nextUuids[blockType.type]?.length) {
      return this.nextUuids[blockType.type].shift() as string;
    }

    let count = this.blockTypeCounter.get(blockType.type) || 0;
    count += 1;
    this.blockTypeCounter.set(blockType.type, count);

    const maxId = this.findMaxId(blockType.type);

    return `${blockType.type}-${maxId + 1}`;
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

  private findMaxId(type: BlockTypeName): number {
    const existingBlocksWithSameType = this.blockStore.getBlocksByType(type);

    const blocksWithSameType = [...existingBlocksWithSameType];

    if (this.transactionService.hasActiveTransaction()) {
      const newBlocks = this.transactionService
        .getActiveTransaction()
        .getUpdates()
        .filter((update) => {
          if ('block' in update) {
            return update.block.type === type;
          }
          return false;
        })
        .map((update) => (update as BlockUpdate).block);

      blocksWithSameType.push(...newBlocks);
    }

    return blocksWithSameType
      .map((block: BlockData) => {
        const match = block.id.split('-').reverse()[0];
        return parseInt(match, 10);
      })
      .filter((x): x is number => x !== null)
      .reduce((a, b) => Math.max(a, b), 0);
  }

  private blockStore: BlockStore;

  private intersect: BlockIntersection[] = [];

  private nextUuids: Record<string, string[]> = {};

  private blockTypeCounter: Map<string, number> = new Map();

  private transactionService: TransactionService;
}

export default TestSceneService;
