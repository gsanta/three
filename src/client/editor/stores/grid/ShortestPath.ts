import Graph from './Graph';

class ShortestPath {
  dijkstra(graph: Graph, start: string, end: string): { distance: number; path: string[] } {
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const queue = new Set<string>(Object.keys(graph));

    // Initialize distances
    for (const node of queue) {
      distances[node] = Infinity;
      previous[node] = null;
    }
    distances[start] = 0;

    while (queue.size > 0) {
      // Find node with the smallest distance
      let currentNode: string | null = null;
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
    const path: string[] = [];
    let current: string | null = end;
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

export default ShortestPath;
