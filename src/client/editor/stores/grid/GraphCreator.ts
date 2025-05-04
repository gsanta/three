import Graph from './Graph';

class GraphCreator {
  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
  }

  create(): Graph {
    const graph: Graph = {};

    const maxIndex = this.rows * this.cols;

    for (let i = 0; i < maxIndex; i++) {
      graph[i] = this.getNeighboursFor(i).map((index) => ({
        index,
        weight: 0,
      }));
    }

    return graph;
  }

  private getNeighboursFor(gridIndex: number) {
    const row = Math.floor(gridIndex / this.cols);
    const col = gridIndex - row * this.cols;

    const minCol = col === 0 ? 0 : col - 1;
    const maxCol = col === this.cols - 1 ? col : col + 1;

    const minRow = row === 0 ? 0 : row - 1;
    const maxRow = row === this.rows - 1 ? row : row + 1;

    const neighbours: number[] = [];

    for (let i = minRow; i <= maxRow; i++) {
      for (let j = minCol; j <= maxCol; j++) {
        neighbours.push(i * this.cols + j);
      }
    }

    return neighbours;
  }

  private rows: number;

  private cols: number;
}

export default GraphCreator;
