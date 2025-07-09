import Grid from '../../models/Grid';
import Num3 from '../../models/math/Num3';
import GridStore from '../../stores/grid/GridStore';
import Direction from '../../ui/types/Direction';
import GridPathBuilder, { GridPath } from './GridPathBuilder';

export type WorldPositionPath = {
  path: {
    position: Num3;
    direction: Direction;
    isTurn: boolean;
  }[];
  lastPosition: Num3;
};

class WorldPositionPathBuilder {
  constructor(gridPathBuilder: GridPathBuilder, gridStore: GridStore) {
    this.gridPathBuilder = gridPathBuilder;

    this.gridStore = gridStore;

    this.grid = new Grid(gridStore);
  }

  build(start: number, end: number): WorldPositionPath {
    const gridPath = this.gridPathBuilder.build(start, end);

    const positions: Num3[] = gridPath.path.map((position) => {
      const pos = this.grid.gridToWorldPos(position.gridIndex);

      const gridSize = this.gridStore.getGridSize();

      let finalPos = pos;

      if (position.direction === 'left') {
        finalPos = [pos[0] - gridSize / 2, pos[1]];
      } else if (position.direction === 'right') {
        finalPos = [pos[0] + gridSize / 2, pos[1]];
      } else if (position.direction === 'up') {
        finalPos = [pos[0], pos[1] - gridSize / 2];
      } else if (position.direction === 'down') {
        finalPos = [pos[0], pos[1] + gridSize / 2];
      }

      return finalPos;
    });

    const adjustedPositions = this.adjustTurnPositions(positions, gridPath);
  }

  private adjustTurnPositions(positions: Num3[], gridPath: GridPath) {
    const moveSize = this.adjustSize / 2;
    const adjustSize = this.adjustSize;

    const sizes: number[] = positions.map(() => this.gridStore.getGridSize());

    for (let i = 0; i < positions.length - 1; i++) {
      const currPos = positions[i];
      const nextPos = positions[i + 1];

      const currDir = gridPath.path[i].direction;
      const nextDir = gridPath.path[i + 1].direction;

      if (!gridPath.path[i].isTurn) {
        continue;
      }

      switch (currDir) {
        case 'left':
          currPos[0] -= moveSize;
          break;
        case 'right':
          currPos[0] += moveSize;
          break;
        case 'up':
          currPos[2] -= moveSize;
          break;
        case 'down':
          currPos[2] += moveSize;
          break;
      }

      sizes[i] += adjustSize;

      switch (nextDir) {
        case 'up':
          nextPos[2] -= moveSize;
          break;
        case 'down':
          nextPos[2] += moveSize;
          break;
        case 'left':
          nextPos[0] -= moveSize;
          break;
        case 'right':
          nextPos[0] += moveSize;
          break;
      }

      sizes[i + 1] -= adjustSize;
    }

    return positions.map((position, i) => ({
      position,
      size: sizes[i],
    }));
  }

  private adjustSize = 0.5;

  private grid: Grid;

  private gridStore: GridStore;

  private gridPathBuilder: GridPathBuilder;
}

export default WorldPositionPathBuilder;
