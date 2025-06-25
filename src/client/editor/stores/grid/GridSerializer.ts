import { Store } from '@reduxjs/toolkit';
import { GridState } from './gridSlice';

class GridSerializer {
  sliceName = 'grid';

  constructor(store: Store) {
    this.store = store;
  }

  export(): GridState {
    const gridState = this.store.getState().grid;

    return gridState;
  }

  private store: Store;
}

export default GridSerializer;
