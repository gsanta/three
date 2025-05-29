import { Store } from '@/client/common/utils/store';
import Grid from '../../models/Grid';

class GridStore {
  constructor(store: Store) {
    this.store = store;
    this.grid = new Grid(this);
  }

  getBlockGridIndex(blockId: string) {
    return this.getGridSlice().blockToGridIndex[blockId];
  }

  getBlockGridPos(blockId: string) {
    const gridIndex = this.getBlockGridIndex(blockId);
    return this.grid.gridIndexToGridPos(gridIndex);
  }

  getBlocksAtGridIndex(gridIndex: number) {
    return this.getGridSlice().gridIndexToBlocks[gridIndex] || [];
  }

  getGridOffset() {
    return this.getGridSlice().gridOffset;
  }

  getGridSize() {
    return this.getGridSlice().gridSize;
  }

  getCols() {
    return this.getGridSlice().gridCols;
  }

  getRows() {
    return this.getGridSlice().gridRows;
  }

  private getGridSlice() {
    return this.store.getState().grid;
  }

  private store: Store;

  private grid: Grid;
}

export default GridStore;
