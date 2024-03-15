import Block from './Block';

type MeshInfo = {
  id: string;
  children: string[];
  parent?: string;
} & Block['data'];

export type PartialMeshInfo = Partial<MeshInfo> & { id: string };

export default MeshInfo;
