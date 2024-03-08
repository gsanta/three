import Block from './Block';

type MeshInfo = {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
} & Block['data'];

export default MeshInfo;
