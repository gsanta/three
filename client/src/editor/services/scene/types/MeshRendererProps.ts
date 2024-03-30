import MeshData from '@/editor/types/MeshData';
import { MeshProps, MeshStandardMaterialProps } from '@react-three/fiber';

type MeshRendererProps = {
  meshInfo: MeshData;
  meshProps?: MeshProps;
  materialProps?: MeshStandardMaterialProps;
};

export default MeshRendererProps;
