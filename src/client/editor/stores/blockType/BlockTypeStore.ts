import { Store } from '@/client/common/utils/store';

class BlockTypeStore {
  constructor(store: Store) {
    this.store = store;
  }

  getBlockTypes() {
    return this.getState().blocks;
  }

  private getState() {
    return this.store.getState().blockType;
  }

  private store: Store;
}

export default BlockTypeStore;
