import Block from './Block';

type MeshData = {
  id: string;
  children: string[];
  parent?: string;
} & Block['data'];

export type PartialMeshData = Partial<MeshData> & { id: string };

export default MeshData;
