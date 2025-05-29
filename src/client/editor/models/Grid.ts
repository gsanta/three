import type GridStore from '../stores/grid/GridStore';
import Vector from './math/Vector';

export const gridToWorldPos = (gridIndex: number, gridCols: number, gridSize: number, gridOffset: [number, number]) => {
  const row = Math.floor(gridIndex / gridCols);
  const col = gridIndex - row * gridCols;

  const posX = gridOffset[0] + col * gridSize;
  const posZ = gridOffset[1] + row * gridSize;

  return [posX, posZ];
};

export const worldToGridIndex = (
  pos: Vector,
  gridCols: number,
  gridSize: number,
  gridOffset: [number, number],
): number => {
  const offsetX = gridOffset[0] + gridSize / 2;
  const offsetZ = gridOffset[1] + gridSize / 2;

  const positiveX = pos.x - offsetX;
  const positiveZ = pos.z - offsetZ;

  const floorX = Math.ceil(positiveX / gridSize);
  const floorZ = Math.ceil(positiveZ / gridSize);

  return floorZ * gridCols + floorX;
};

class Grid {
  constructor(gridStore: GridStore) {
    this.gridStore = gridStore;
  }

  gridToWorldPos(gridIndex: number) {
    return gridToWorldPos(
      gridIndex,
      this.gridStore.getCols(),
      this.gridStore.getGridSize(),
      this.gridStore.getGridOffset(),
    );
  }

  worldToGridIndex(pos: Vector) {
    return worldToGridIndex(
      pos,
      this.gridStore.getCols(),
      this.gridStore.getGridSize(),
      this.gridStore.getGridOffset(),
    );
  }

  gridPositionToGridIndex(posX: number, posZ: number): number {
    return this.gridStore.getCols() * posZ + posX;
  }

  gridIndexToGridPos(gridIndex: number): [number, number] {
    const row = Math.floor(gridIndex / this.gridStore.getCols());
    const col = gridIndex - row * this.gridStore.getCols();

    return [col, row];
  }

  getPosition(pos: Vector) {
    const offsetX = this.gridStore.getGridOffset()[0] + this.gridStore.getGridSize() / 2;
    const offsetZ = this.gridStore.getGridOffset()[1] + this.gridStore.getGridSize() / 2;

    const floorX = this.getGridX(pos);
    const floorZ = this.getGridZ(pos);

    const centerX = floorX + this.gridStore.getGridSize() / 2;
    const centerZ = floorZ + this.gridStore.getGridSize() / 2;

    const finalX = centerX + offsetX;
    const finalZ = centerZ + offsetZ;

    return new Vector([finalX, pos.y, finalZ]);
  }

  private getGridX(pos: Vector) {
    const offsetX = this.gridStore.getGridOffset()[0] + this.gridStore.getGridSize() / 2;

    const positiveX = pos.x - offsetX;

    return Math.floor(positiveX / this.gridStore.getGridSize()) * this.gridStore.getGridSize();
  }

  private getGridZ(pos: Vector) {
    const offsetZ = this.gridStore.getGridOffset()[1] + this.gridStore.getGridSize() / 2;

    const positiveZ = pos.z - offsetZ;

    return Math.floor(positiveZ / this.gridStore.getGridSize()) * this.gridStore.getGridSize();
  }

  private gridStore: GridStore;
}

export default Grid;
