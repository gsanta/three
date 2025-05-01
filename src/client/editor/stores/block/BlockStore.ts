import { Store } from '@/client/common/utils/store';
import BlockDecoration, { BlockCategories } from '@/client/editor/models/BlockCategory';
import BlockType from '../../types/BlockType';

class BlockStore {
  constructor(store: Store) {
    this.store = store;

    this.mode = 'city';
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

  getDecoration<T extends BlockDecoration>(category: T, id?: string) {
    if (!id) {
      throw new Error('Id is not defined');
    }

    const decoration = this.getState().decorations[category][id];

    if (!decoration) {
      throw new Error(`Decoration '${category}' not found`);
    }

    return decoration;
  }

  getDecorations<T extends BlockDecoration>(category: T) {
    return this.getState().decorations[category];
  }

  getDecorationsAsArray<T extends BlockDecoration>(decoration: T) {
    return Object.values(this.getState().decorations[decoration]) as BlockCategories[T][];
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

  getRootBlockIds() {
    return this.getState().rootBlocksIds;
  }

  getDescendants(blockId: string, categoryFilter?: string): BlockType[] {
    const block = this.getBlock(blockId);

    if (block.childConnections.length === 0) {
      if (categoryFilter) {
        return block.category === categoryFilter ? [block] : [];
      } else {
        return [block];
      }
    }

    const descendants: BlockType[] = [];

    for (const child of block.childConnections) {
      descendants.push(...this.getDescendants(child.childBlock, categoryFilter));
    }

    return descendants;
  }

  getRoot(blockId: string, expectedCategory?: string): BlockType {
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

  filterDescendants(blockId: string, filter: { category: string }): BlockType[] {
    const block = this.getBlock(blockId);

    const result: BlockType[] = [];

    this.iterateDescendents(block, true, (descendant) => {
      if (descendant.category === filter.category) {
        result.push(descendant);
      }

      return false;
    });

    return result;
  }

  isDescendentSelected(block: BlockType, checkSelf: boolean) {
    const terminate = this.iterateDescendents(block, checkSelf, (descendant: BlockType) => {
      return descendant.isSelected;
    });

    return terminate;
  }

  iterateDescendents(
    block: BlockType,
    iterateSelf: boolean,
    doWork: (descendant: BlockType) => boolean | undefined,
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

  setCurrentMode(mode: 'city' | 'building') {
    this.mode = mode;
  }

  private getState() {
    const mode = this.store.getState().editor.mode;
    if (mode === 'city') {
      return this.store.getState().block.present;
    } else {
      return this.store.getState().building.present;
    }
  }

  private mode: 'city' | 'building';

  private store: Store;
}

export default BlockStore;
