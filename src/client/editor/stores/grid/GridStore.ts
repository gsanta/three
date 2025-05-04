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

  getCols() {
    return this.store.getState().grid.gridCols;
  }

  getRows() {
    return this.store.getState().grid.gridRows;
  }

  private store: Store;
}

export default GridStore;
