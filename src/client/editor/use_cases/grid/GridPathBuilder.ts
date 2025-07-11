import Grid from '../../models/Grid';
import GridStore from '../../stores/grid/GridStore';
import Direction from '../../ui/types/Direction';
import Dijkstra from './Dijkstra';

export type GridPath = {
  path: {
    index: number;
    cost: number;
    direction: Direction;
    isTurn: boolean;
  }[];
  lastNode: {
    index: number;
    cost: number;
  };
};

class GridPathBuilder {
  constructor(gridStore: GridStore) {
    this.gridStore = gridStore;

    this.grid = new Grid(gridStore);

    this.dijkstra = new Dijkstra();
  }

  build(start: number, end: number): GridPath {
    const { path } = this.dijkstra.execute(this.gridStore.getGraph(), start, end);

    const pathWithoutLast = path.slice(0, -1);

    const directions: Direction[] = pathWithoutLast.map((node, index) => {
      const next = path[index + 1].index;
      return this.getDirection(node.index, next);
    });

    const directionsWithoutLast = directions.slice(0, -1);

    const turns = directionsWithoutLast.map((direction, index) => {
      const next = directions[index + 1];
      return this.isTurn(direction, next);
    });

    turns.push(false); // Last direction cannot be a turn

    const gridPath = pathWithoutLast.map((node, i) => ({
      ...node,
      direction: directions[i],
      isTurn: turns[i],
    }));

    return {
      path: gridPath,
      lastNode: path[path.length - 1],
    };
  }

  private getDirection(curr: number, next: number): Direction {
    const [currCol, currRow] = this.grid.gridIndexToGridPosition(curr);
    const [nextCol, nextRow] = this.grid.gridIndexToGridPosition(next);

    if (nextRow === currRow && nextCol === currCol + 1) {
      return 'right';
    } else if (nextRow === currRow && nextCol === currCol - 1) {
      return 'left';
    } else if (nextCol === currCol && nextRow === currRow + 1) {
      return 'down';
    } else if (nextCol === currCol && nextRow === currRow - 1) {
      return 'up';
    }

    throw new Error(`Invalid path direction from ${curr} to ${next}`);
  }

  private isTurn(currDir: Direction, nextDir: Direction): boolean {
    const isVertical = (dir: Direction) => dir === 'up' || dir === 'down';
    const isHorizontal = (dir: Direction) => dir === 'left' || dir === 'right';

    return (isVertical(currDir) && isHorizontal(nextDir)) || (isHorizontal(currDir) && isVertical(nextDir));
  }

  private gridStore: GridStore;

  private grid: Grid;

  private dijkstra: Dijkstra;
}

export default GridPathBuilder;
