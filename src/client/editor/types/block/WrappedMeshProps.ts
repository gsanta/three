import { ShapeType } from '@/client/editor/types/BlockType';
import Block from '@/client/editor/types/Block';
import { MeshProps, MeshStandardMaterialProps, ThreeEvent } from '@react-three/fiber';

type WrappedMeshProps<S extends ShapeType = ShapeType> = {
  additions?: {
    position: Block['position'];
  };
  block: Block<S>;
  meshProps?: Omit<MeshProps, 'onPointerEnter'> & {
    onPointerEnter?: (event: ThreeEvent<PointerEvent>, partIndex?: string) => void;
  };
  materialProps?: MeshStandardMaterialProps;
  overwrites?: {
    position?: Block['position'];
    rotation?: Block['rotation'];
  };
  parent?: Block;
  selectedParts: string[];
};

export default WrappedMeshProps;
