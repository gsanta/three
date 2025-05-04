import { Store } from '@/client/common/utils/store';

class GridStore {
  constructor(store: Store) {
    this.store = store;
  }

  getGridOffset() {
    return this.store.getState().grid.gridOffset;
  }

  getGridSize() {
    return this.store.getState().grid.gridSize;
  }

  private store: Store;
}

export default GridStore;
