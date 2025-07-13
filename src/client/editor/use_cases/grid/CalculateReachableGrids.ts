import BlockData from '../../models/block/BlockData';
import Grid from '../../models/Grid';
import Vector from '../../models/math/Vector';
import GridStore from '../../stores/grid/GridStore';

class CalculateReachableGrids {
  constructor(gridStore: GridStore) {
    this.grid = new Grid(gridStore);

    this.gridStore = gridStore;
  }

  execute(block: BlockData) {
    const gridIndex = this.grid.worldToGridIndex(new Vector(block.position));
    const cols = this.gridStore.getCols();

    const reachables: Record<number, { cost: number; gridPosition: [number, number] }> = {
      [gridIndex - 1]: {
        cost: 1,
        gridPosition: this.grid.gridIndexToGridPosition(gridIndex - 1),
      },
      [gridIndex + 1]: {
        cost: 1,
        gridPosition: this.grid.gridIndexToGridPosition(gridIndex + 1),
      },
      [gridIndex - 1 - cols]: {
        cost: 1,
        gridPosition: this.grid.gridIndexToGridPosition(gridIndex - 1 - cols),
      },
      [gridIndex - cols]: {
        cost: 1,
        gridPosition: this.grid.gridIndexToGridPosition(gridIndex - cols),
      },
      [gridIndex + 1 - cols]: {
        cost: 1,
        gridPosition: this.grid.gridIndexToGridPosition(gridIndex + 1 - cols),
      },
      [gridIndex - 1 + cols]: {
        cost: 1,
        gridPosition: this.grid.gridIndexToGridPosition(gridIndex - 1 + cols),
      },
      [gridIndex + cols]: {
        cost: 1,
        gridPosition: this.grid.gridIndexToGridPosition(gridIndex + cols),
      },
      [gridIndex + 1 + cols]: {
        cost: 1,
        gridPosition: this.grid.gridIndexToGridPosition(gridIndex + 1 + cols),
      },
    };

    return reachables;
  }

  private grid: Grid;

  private gridStore: GridStore;
}

export default CalculateReachableGrids;
