import { ShapeType } from '@/client/editor/types/BlockType';
import Block from '@/client/editor/types/Block';
import { MeshProps, MeshStandardMaterialProps } from '@react-three/fiber';

type WrappedMeshProps<S extends ShapeType = ShapeType> = {
  additions?: {
    position: Block['position'];
  };
  block: Block<S>;
  meshProps?: MeshProps;
  materialProps?: MeshStandardMaterialProps;
  overwrites?: {
    position?: Block['position'];
    rotation?: Block['rotation'];
  };
  parent?: Block;
  selectedParts: string[];
};

export default WrappedMeshProps;
