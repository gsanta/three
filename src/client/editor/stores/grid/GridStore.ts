import { Store } from '@/client/common/utils/store';
import Grid from '../../models/Grid';
import BlockStore from '../block/BlockStore';

class GridStore {
  constructor(blockStore: BlockStore, store: Store) {
    this.store = store;
    this.grid = new Grid(this);

    this.blockStore = blockStore;
  }

  getBlockGridIndex(blockId: string) {
    const index = this.getGridSlice().blockToGridIndex?.[blockId];

    if (index === undefined) {
      return -1;
    }

    return index;
  }

  getBlockGridPos(blockId: string) {
    const gridIndex = this.getBlockGridIndex(blockId);
    return this.grid.gridIndexToGridPos(gridIndex);
  }

  getBlocksAtGridIndex(gridIndex: number) {
    return this.getGridSlice().gridIndexToBlocks[gridIndex]?.map((blockId) => this.blockStore.getBlock(blockId)) || [];
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

  private blockStore: BlockStore;

  private store: Store;

  private grid: Grid;
}

export default GridStore;
