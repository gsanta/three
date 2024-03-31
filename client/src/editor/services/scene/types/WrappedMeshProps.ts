import MeshData from '@/editor/types/MeshData';
import { MeshProps, MeshStandardMaterialProps } from '@react-three/fiber';

type WrappedMeshProps = {
  meshInfo: MeshData;
  meshProps?: MeshProps;
  materialProps?: MeshStandardMaterialProps;
  parent?: MeshData;
};

export default WrappedMeshProps;
