import { Store } from '@/client/common/utils/store';
import BlockDecoration, { BlockCategories } from '@/client/editor/types/BlockCategory';
import Block from '../../types/Block';
import BlockUtils from '../../utils/BlockUtils';

class BlockStore {
  constructor(store: Store) {
    this.store = store;
  }

  getHovered() {
    return this.store.getState().block.present.hovered;
  }

  getBlock(id?: string) {
    if (!id) {
      throw new Error('Id is not defined');
    }

    return this.store.getState().block.present.blocks[id];
  }

  getBlocks() {
    return this.store.getState().block.present.blocks;
  }

  getBlocksAsArray() {
    return Object.values(this.store.getState().block.present.blocks);
  }

  getRootBlock(blockId: string) {
    let block = this.getBlock(blockId);
    while (block.parent) {
      block = this.getBlock(block.parent);
    }

    return block;
  }

  getSelectedRootBlockIds() {
    return this.store.getState().block.present.selectedRootBlockIds;
  }

  getSelectedPart(blockId?: string) {
    return this.getSelectedPartIndexes()[blockId || '']?.[0];
  }

  getSelectedPartIndexes() {
    return this.store.getState().block.present.selectedPartIndexes;
  }

  getDecoration<T extends BlockDecoration>(category: T, id?: string) {
    if (!id) {
      throw new Error('Id is not defined');
    }

    const decoration = this.store.getState().block.present.decorations[category][id];

    if (!decoration) {
      throw new Error(`Decoration '${category}' not found`);
    }

    return decoration;
  }

  getDecorations<T extends BlockDecoration>(category: T) {
    return this.store.getState().block.present.decorations[category];
  }

  getDecorationsAsArray<T extends BlockDecoration>(decoration: T) {
    return Object.values(this.store.getState().block.present.decorations[decoration]) as BlockCategories[T][];
  }

  getBlockSettings() {
    return this.store.getState().blockType;
  }

  getBlockTemplates() {
    return this.store.getState().blockType.blocks;
  }

  getBlockType(type: string) {
    return this.store.getState().blockType.blocks.find((block) => block.type === type);
  }

  getRootBlockIds() {
    return this.store.getState().block.present.rootBlocksIds;
  }

  getDescendants(blockId: string, categoryFilter?: string): Block[] {
    const block = this.getBlock(blockId);

    if (block.children.length === 0) {
      if (categoryFilter) {
        return block.category === categoryFilter ? [block] : [];
      } else {
        return [block];
      }
    }

    const descendants: Block[] = [];

    for (const child of block.children) {
      descendants.push(...this.getDescendants(child, categoryFilter));
    }

    return descendants;
  }

  getRoot(blockId: string, expectedCategory?: string): Block {
    const block = this.getBlock(blockId);

    if (!block.parent) {
      if (expectedCategory && expectedCategory !== block.category) {
        throw new Error(`Expected category is ${expectedCategory}, but got ${block.category}`);
      }

      return block;
    }

    return this.getRoot(block.parent, expectedCategory);
  }

  isDescendentSelected(block: Block, checkSelf: boolean) {
    const terminate = this.iterateDescendents(block, checkSelf, (descendant: Block) => {
      return descendant.isSelected;
    });

    return terminate;
  }

  iterateDescendents(
    block: Block,
    iterateSelf: boolean,
    doWork: (descendant: Block) => boolean | undefined,
  ): boolean | undefined {
    if (iterateSelf) {
      const terminate = doWork(block);

      if (terminate) {
        return terminate;
      }
    }

    for (const childId of block.children) {
      const child = this.getBlock(childId);
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

  private store: Store;
}

export default BlockStore;
