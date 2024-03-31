import { ShapeType } from '@/editor/types/Block';
import MeshData from '@/editor/types/MeshData';
import { MeshProps, MeshStandardMaterialProps } from '@react-three/fiber';

type WrappedMeshProps<S extends ShapeType = ShapeType> = {
  meshInfo: MeshData<S>;
  meshProps?: MeshProps;
  materialProps?: MeshStandardMaterialProps;
  parent?: MeshData;
};

export default WrappedMeshProps;
