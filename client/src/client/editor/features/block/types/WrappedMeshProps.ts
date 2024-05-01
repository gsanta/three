import { ShapeType } from '@/client/editor/types/BlockType';
import Block from '@/client/editor/types/Block';
import { MeshProps, MeshStandardMaterialProps } from '@react-three/fiber';

type WrappedMeshProps<S extends ShapeType = ShapeType> = {
  meshInfo: Block<S>;
  meshProps?: MeshProps;
  materialProps?: MeshStandardMaterialProps;
  partMaterialProps?: Record<string, { 'material-color'?: string }>;
  parent?: Block;
};

export default WrappedMeshProps;
