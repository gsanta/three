import { Store } from '@/common/utils/store';
import BlockCategory from '@/editor/types/BlockCategory';

class BlockStore {
  constructor(store: Store) {
    this.store = store;
  }

  getBlocks() {
    return this.store.getState().blocks.present.blocks;
  }

  getSelectedBlockIds() {
    return this.store.getState().blocks.present.selectedBlockIds;
  }

  getDecoration<T extends BlockCategory>(category: T, id: string) {
    return this.store.getState().blocks.present.categories[category][id];
  }

  getBlockSettings() {
    return this.store.getState().blockSettings.present;
  }

  getRootBlockIds() {
    return this.store.getState().blocks.present.rootBlocksIds;
  }

  private store: Store;
}

export default BlockStore;
