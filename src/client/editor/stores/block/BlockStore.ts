import { Store } from '@/client/common/utils/store';
import BlockCategory from '@/client/editor/types/BlockCategory';

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
    do {
      block = this.getBlock(block.parent);
    } while (block.parent);

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

  getDecoration<T extends BlockCategory>(category: T, id?: string) {
    if (!id) {
      throw new Error('Id is not defined');
    }

    return this.store.getState().block.present.decorations[category][id];
  }

  getDecorations<T extends BlockCategory>(category: T) {
    return this.store.getState().block.present.decorations[category];
  }

  getBlockSettings() {
    return this.store.getState().blockType;
  }

  getBlockTemplates() {
    return this.store.getState().blockType.blocks;
  }

  getTemplateByType(type: string) {
    return this.store.getState().blockType.blocks.find((block) => block.type === type);
  }

  getRootBlockIds() {
    return this.store.getState().block.present.rootBlocksIds;
  }

  private store: Store;
}

export default BlockStore;
