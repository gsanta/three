import Block from './Block';

type MeshInfo = {
  id: string;
} & Block['data'];

export type PartialMeshInfo = Partial<MeshInfo> & { id: string };

export default MeshInfo;
