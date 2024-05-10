import { Store } from '@/client/common/utils/store';
import BlockCategory from '@/client/editor/types/BlockCategory';

class BlockStore {
  constructor(store: Store) {
    this.store = store;
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

  getSelectedRootBlockIds() {
    return this.store.getState().block.present.selectedRootBlockIds;
  }

  getSelectedPartNames() {
    return this.store.getState().block.present.selectedPartNames;
  }

  getDecoration<T extends BlockCategory>(category: T, id?: string) {
    if (!id) {
      throw new Error('Id is not defined');
    }

    return this.store.getState().block.present.categories[category][id];
  }

  getDecorations<T extends BlockCategory>(category: T) {
    return this.store.getState().block.present.categories[category];
  }

  getBlockSettings() {
    return this.store.getState().template.present;
  }

  getBlockTemplates() {
    return this.store.getState().template.present.blocks;
  }

  getBlockTemplatesByName(name: string) {
    return this.store.getState().template.present.blocks.find((block) => block.name === name);
  }

  getRootBlockIds() {
    return this.store.getState().block.present.rootBlocksIds;
  }

  private store: Store;
}

export default BlockStore;
