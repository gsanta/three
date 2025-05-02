import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import BlockData from '../../models/block/BlockData';
import Vector from '../../models/math/Vector';
import BlockStore from '../../stores/block/BlockStore';

type Filter = {
  category?: BlockCategoryName;
  custom?(block: BlockData): boolean;
  skipBlocks?: string[];
};

class FindNearestBlock {
  constructor(blockStore: BlockStore) {
    this.blockStore = blockStore;
  }

  find(position: Vector, filter: Filter): BlockData | undefined {
    const candidates = this.blockStore.getBlocksAsArray().filter((block) => {
      if (!this.checkCategory(filter, block)) {
        return false;
      }

      if (!this.checkCustom(filter, block)) {
        return false;
      }

      if (!this.checkSkipBlocks(filter, block)) {
        return false;
      }

      return true;
    });

    const { blockId: closestBlockId } = candidates.reduce(
      (closest, next) => {
        const newDistance = position.distance(new Vector(next.position));
        if (closest.distance === -1 || closest.distance > newDistance) {
          return {
            blockId: next.id,
            distance: newDistance,
          };
        }

        return closest;
      },
      {
        blockId: '',
        distance: -1,
      },
    );

    return closestBlockId ? this.blockStore.getBlock(closestBlockId) : undefined;
  }

  private checkCategory(filter: Filter, block: BlockData) {
    if (!filter.category) {
      return true;
    }

    return block.category === filter.category;
  }

  private checkCustom(filter: Filter, block: BlockData) {
    if (!filter.custom) {
      return true;
    }

    return filter.custom(block);
  }

  private checkSkipBlocks(filter: Filter, block: BlockData) {
    if (!filter.skipBlocks) {
      return true;
    }

    return !filter.skipBlocks.includes(block.id);
  }

  private blockStore: BlockStore;
}

export default FindNearestBlock;
