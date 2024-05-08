import { ShapeType } from '@/client/editor/types/BlockType';
import Block from '@/client/editor/types/Block';
import { MeshProps, MeshStandardMaterialProps } from '@react-three/fiber';

type WrappedMeshProps<S extends ShapeType = ShapeType> = {
  block: Block<S>;
  meshProps?: MeshProps;
  materialProps?: MeshStandardMaterialProps;
  parent?: Block;
  selectedParts: string[];
  additions?: {
    position: Block['position'];
  };
};

export default WrappedMeshProps;
