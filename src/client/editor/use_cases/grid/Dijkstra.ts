import Graph from '../../stores/grid/Graph';

class Dijkstra {
  execute(graph: Graph, start: number, end: number): { distance: number; path: number[] } {
    const distances: Record<number, number> = {};
    const previous: Record<number, number | null> = {};
    const queue = new Set<number>(Object.keys(graph).map(Number));

    // Initialize distances
    for (const node of queue) {
      distances[node] = Infinity;
      previous[node] = null;
    }
    distances[start] = 0;

    while (queue.size > 0) {
      // Find node with the smallest distance
      let currentNode: number | null = null;
      for (const node of queue) {
        if (currentNode === null || distances[node] < distances[currentNode]) {
          currentNode = node;
        }
      }

      if (currentNode === null) break;
      queue.delete(currentNode);

      if (currentNode === end) break;

      for (const neighbor of graph[Number(currentNode)]) {
        const alt = distances[currentNode] + neighbor.weight;
        if (alt < distances[neighbor.index]) {
          distances[neighbor.index] = alt;
          previous[neighbor.index] = currentNode;
        }
      }
    }

    // Reconstruct path
    const path: number[] = [];
    let current: number | null = end;
    while (current) {
      path.unshift(current);
      current = previous[current];
    }

    return {
      distance: distances[end],
      path: distances[end] === Infinity ? [] : path,
    };
  }
}

export default Dijkstra;
