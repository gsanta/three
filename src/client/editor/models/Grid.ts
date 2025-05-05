import GridStore from '../stores/grid/GridStore';
import Vector from './math/Vector';

class Grid {
  constructor(gridStore: GridStore) {
    this.gridStore = gridStore;
  }

  gridToWorldPos(gridIndex: number) {
    const row = Math.floor(gridIndex / this.gridStore.getCols());
    const col = gridIndex - row * this.gridStore.getCols();

    const gridSize = this.gridStore.getGridSize();

    const offsetX = this.gridStore.getGridOffset()[0];
    const offsetZ = this.gridStore.getGridOffset()[1];

    const posX = offsetX + col * gridSize;
    const posZ = offsetZ + row * gridSize;

    return [posX, posZ];
  }

  getGridIndex(pos: Vector) {
    const offsetX = this.gridStore.getGridOffset()[0] + this.gridStore.getGridSize() / 2;
    const offsetZ = this.gridStore.getGridOffset()[1] + this.gridStore.getGridSize() / 2;

    const positiveX = pos.x - offsetX;
    const positiveZ = pos.z - offsetZ;

    const floorX = Math.floor(positiveX / this.gridStore.getGridSize());
    const floorZ = Math.floor(positiveZ / this.gridStore.getGridSize());

    return floorZ * this.gridStore.getCols() + floorX;
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
