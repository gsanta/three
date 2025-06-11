import { Store } from '@/client/common/utils/store';
import { BlockDecoratorName, BlockDecorations } from '@/client/editor/models/block/BlockDecoration';
import BlockData from '../../models/block/BlockData';
import { BlockCategoryName } from '../../models/block/BlockCategoryName';

class BlockStore {
  constructor(store: Store) {
    this.store = store;
  }

  getHovered() {
    return this.getState().hovered;
  }

  getBlock(id?: string) {
    if (!id) {
      throw new Error('Id is not defined');
    }

    return this.getState().blocks[id];
  }

  getBlocks() {
    return this.getState().blocks;
  }

  getBlocksAsArray() {
    return Object.values(this.getState().blocks);
  }

  getRootBlock(blockId: string) {
    let block = this.getBlock(blockId);
    while (block.parentConnection) {
      block = this.getBlock(block.parentConnection.block);
    }

    return block;
  }

  getDecorator<T extends BlockDecoratorName>(decoratorName: T, id?: string) {
    if (!id) {
      throw new Error('Id is not defined');
    }

    const decoration = this.getState().decorations[decoratorName][id];

    if (!decoration) {
      throw new Error(`Decoration '${decoratorName}' not found`);
    }

    return decoration;
  }

  getDecorations<T extends BlockDecoratorName>(category: T) {
    return this.getState().decorations[category];
  }

  getDecorationsAsArray<T extends BlockCategoryName>(decoration: T) {
    return Object.values(this.getState().decorations[decoration]) as BlockDecorations[T][];
  }

  getBlockSettings() {
    return this.store.getState().blockType;
  }

  getBlockTemplates() {
    return this.store.getState().blockType.blocks;
  }

  getBlockType(type: string) {
    const blockType = this.store.getState().blockType.blocks.find((block) => block.type === type);

    if (!blockType) {
      throw new Error(`Block type ${type} not found`);
    }

    return blockType;
  }

  getCurrentPlayer() {
    return this.getState().currentPlayer;
  }

  getRootBlockIds() {
    return this.getState().rootBlocksIds;
  }

  getDescendants(blockId: string, categoryFilter?: string): BlockData[] {
    const block = this.getBlock(blockId);

    if (block.childConnections.length === 0) {
      if (categoryFilter) {
        return block.category === categoryFilter ? [block] : [];
      } else {
        return [block];
      }
    }

    const descendants: BlockData[] = [];

    for (const child of block.childConnections) {
      descendants.push(...this.getDescendants(child.childBlock, categoryFilter));
    }

    return descendants;
  }

  getRoot(blockId: string, expectedCategory?: string): BlockData {
    const block = this.getBlock(blockId);

    if (!block.parentConnection) {
      if (expectedCategory && expectedCategory !== block.category) {
        throw new Error(`Expected category is ${expectedCategory}, but got ${block.category}`);
      }

      return block;
    }

    return this.getRoot(block.parentConnection.block, expectedCategory);
  }

  filterParts(blockId: string, filter: { orientation: number }): string[] {
    const block = this.getBlock(blockId);

    const keys = Object.keys(block.partDetails).filter(
      (key) => block.partDetails[key]?.orientation === filter.orientation,
    );

    return keys;
  }

  filterDescendants(blockId: string, filter: { category: string }): BlockData[] {
    const block = this.getBlock(blockId);

    const result: BlockData[] = [];

    this.iterateDescendents(block, true, (descendant) => {
      if (descendant.category === filter.category) {
        result.push(descendant);
      }

      return false;
    });

    return result;
  }

  isDescendentSelected(block: BlockData, checkSelf: boolean) {
    const terminate = this.iterateDescendents(block, checkSelf, (descendant: BlockData) => {
      return descendant.isSelected;
    });

    return terminate;
  }

  iterateDescendents(
    block: BlockData,
    iterateSelf: boolean,
    doWork: (descendant: BlockData) => boolean | undefined,
  ): boolean | undefined {
    if (iterateSelf) {
      const terminate = doWork(block);

      if (terminate) {
        return terminate;
      }
    }

    for (const connection of block.childConnections) {
      const child = this.getBlock(connection.childBlock);
      let terminate = doWork(child);

      if (terminate) {
        return terminate;
      }

      terminate = this.iterateDescendents(child, iterateSelf, doWork);

      if (terminate) {
        return terminate;
      }
    }

    return false;
  }

  private getState() {
    return this.store.getState().block.present;
  }

  private store: Store;
}

export default BlockStore;
