import BlockType, { ShapeType } from './BlockType';

type Block<S extends ShapeType = ShapeType> = {
  id: string;
  children: string[];
  parent?: string;
} & BlockType<S>;

export type PartialMeshData = Partial<Block> & { id: string };

export default Block;
