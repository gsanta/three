export type GraphNode = {
  index: number;
  weight: number;
};

type Graph = Record<number, GraphNode[]>;

export default Graph;
