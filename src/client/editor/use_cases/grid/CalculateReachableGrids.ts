import BlockData from '../../models/block/BlockData';
import Grid from '../../models/Grid';
import Vector from '../../models/math/Vector';
import GridStore from './GridStore';

class CalculateReachableGrids {
  constructor(gridStore: GridStore) {
    this.grid = new Grid(gridStore);

    this.gridStore = gridStore;
  }

  execute(block: BlockData) {
    const gridIndex = this.grid.getGridIndex(new Vector(block.position));
    const cols = this.gridStore.getCols();

    const reachables: Record<number, number> = {
      [gridIndex - 1]: 1,
      [gridIndex + 1]: 1,
      [gridIndex - 1 - cols]: 1,
      [gridIndex - cols]: 1,
      [gridIndex + 1 - cols]: 1,
      [gridIndex - 1 + cols]: 1,
      [gridIndex + cols]: 1,
      [gridIndex + 1 + cols]: 1,
    };

    return reachables;
  }

  private grid: Grid;

  private gridStore: GridStore;
}

export default CalculateReachableGrids;
