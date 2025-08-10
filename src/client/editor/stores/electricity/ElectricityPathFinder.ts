import ElectricityStore from './ElectricityStore';

class ElectricityPathFinder {
  constructor(electricityStore: ElectricityStore) {
    this.electricityStore = electricityStore;
  }

  find(startNode: string, filterFn: (node: string, depth: number) => boolean): string | undefined {
    let result: string | undefined;

    this.visit(startNode, (node, depth) => {
      if (filterFn(node, depth)) {
        result = node;
      }

      if (result) {
        return true;
      }

      return false;
    });

    return result;
  }

  filter(startNode: string, filterFn: (node: string, depth: number) => boolean): string[] {
    const results: string[] = [];
    this.visit(startNode, (node, depth) => {
      if (filterFn(node, depth)) {
        results.push(node);
      }
    });
    return results;
  }

  visit(
    startNode: string,
    callback: (node: string, depth: number) => boolean | void,
    connectionCallback?: (params: { fromNode: string; toNode: string; edgeId: string; depth: number }) => void,
  ) {
    const relations = this.electricityStore.getRelations();
    const visited = new Set<string>();
    const queue: { node: string; depth: number }[] = [{ node: startNode, depth: 0 }];

    while (queue.length > 0) {
      const { node, depth } = queue.shift()!;

      if (visited.has(node)) continue;
      visited.add(node);

      if (callback(node, depth)) {
        return;
      }

      const connections = relations[node] || [];
      connections.forEach((connection) => {
        if (!visited.has(connection.to)) {
          connectionCallback?.({ fromNode: node, toNode: connection.to, edgeId: connection.edgeId, depth });

          queue.push({ node: connection.to, depth: depth + 1 });
        }
      });
    }
  }

  // execute(graph: Graph, start: number, end: number): { distance: number; path: { index: number; cost: number }[] } {
  //   const distances: Record<number, number> = {};
  //   const previous: Record<number, number | null> = {};
  //   const queue = new Set<number>(Object.keys(graph).map(Number));

  //   // Initialize distances
  //   for (const node of queue) {
  //     distances[node] = Infinity;
  //     previous[node] = null;
  //   }
  //   distances[start] = 0;

  //   while (queue.size > 0) {
  //     // Find node with the smallest distance
  //     let currentNode: number | null = null;
  //     for (const node of queue) {
  //       if (currentNode === null || distances[node] < distances[currentNode]) {
  //         currentNode = node;
  //       }
  //     }

  //     if (currentNode === null) break;
  //     queue.delete(currentNode);

  //     if (currentNode === end) break;

  //     for (const neighbor of graph[Number(currentNode)]) {
  //       const alt = distances[currentNode] + neighbor.weight;
  //       if (alt < distances[neighbor.index]) {
  //         distances[neighbor.index] = alt;
  //         previous[neighbor.index] = currentNode;
  //       }
  //     }
  //   }

  //   // Reconstruct path and costs
  //   const path: { index: number; cost: number }[] = [];
  //   let current: number | null = end;
  //   while (current !== null && previous[current] !== undefined) {
  //     path.unshift({ index: current, cost: distances[current] });
  //     current = previous[current];
  //   }
  //   if (current === start) {
  //     path.unshift({ index: start, cost: distances[start] });
  //   }

  //   return {
  //     distance: distances[end],
  //     path: distances[end] === Infinity ? [] : path,
  //   };
  // }

  private electricityStore: ElectricityStore;
}

export default ElectricityPathFinder;
