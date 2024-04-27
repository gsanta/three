import { Store } from '@/client/common/utils/store';
import BlockCategory from '@/client/editor/types/BlockCategory';

class BlockStore {
  constructor(store: Store) {
    this.store = store;
  }

  getBlocks() {
    return this.store.getState().block.present.blocks;
  }

  getSelectedBlockIds() {
    return this.store.getState().block.present.selectedBlockIds;
  }

  getDecoration<T extends BlockCategory>(category: T, id: string) {
    return this.store.getState().block.present.categories[category][id];
  }

  getBlockSettings() {
    return this.store.getState().template.present;
  }

  getRootBlockIds() {
    return this.store.getState().block.present.rootBlocksIds;
  }

  private store: Store;
}

export default BlockStore;
