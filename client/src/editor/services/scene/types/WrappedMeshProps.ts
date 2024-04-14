import { ShapeType } from '@/editor/types/BlockType';
import Block from '@/editor/types/Block';
import { MeshProps, MeshStandardMaterialProps } from '@react-three/fiber';

type WrappedMeshProps<S extends ShapeType = ShapeType> = {
  meshInfo: Block<S>;
  meshProps?: MeshProps;
  materialProps?: MeshStandardMaterialProps;
  parent?: Block;
};

export default WrappedMeshProps;
