import { ShapeType } from '@/client/editor/models/BaseBlockType';
import BlockType from '@/client/editor/types/BlockType';
import { MeshProps, MeshStandardMaterialProps, ThreeEvent } from '@react-three/fiber';

type WrappedMeshProps<S extends ShapeType = ShapeType> = {
  additions?: {
    position: BlockType['position'];
  };
  block: BlockType<S>;
  meshProps?: Omit<MeshProps, 'onPointerEnter'> & {
    onPointerEnter?: (event: ThreeEvent<PointerEvent>, partIndex?: string) => void;
  };
  materialProps?: MeshStandardMaterialProps;
  overwrites?: {
    position?: BlockType['position'];
    rotation?: BlockType['rotation'];
  };
};

export default WrappedMeshProps;
