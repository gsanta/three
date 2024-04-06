import BlockData, { ShapeType } from './BlockData';

type Block<S extends ShapeType = ShapeType> = {
  id: string;
  children: string[];
  parent?: string;
} & BlockData<S>['data'];

export type PartialMeshData = Partial<Block> & { id: string };

export default Block;
