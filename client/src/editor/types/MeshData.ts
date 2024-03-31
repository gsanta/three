import Block, { ShapeType } from './Block';

type MeshData<S extends ShapeType = ShapeType> = {
  id: string;
  children: string[];
  parent?: string;
} & Block<S>['data'];

export type PartialMeshData = Partial<MeshData> & { id: string };

export default MeshData;
