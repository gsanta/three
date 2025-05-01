import { ShapeType } from '@/client/editor/data/BlockConstantData';
import BlockData from '@/client/editor/data/BlockData';
import { MeshProps, MeshStandardMaterialProps, ThreeEvent } from '@react-three/fiber';

type WrappedMeshProps<S extends ShapeType = ShapeType> = {
  additions?: {
    position: BlockData['position'];
  };
  block: BlockData<S>;
  meshProps?: Omit<MeshProps, 'onPointerEnter'> & {
    onPointerEnter?: (event: ThreeEvent<PointerEvent>, partIndex?: string) => void;
  };
  materialProps?: MeshStandardMaterialProps;
  overwrites?: {
    position?: BlockData['position'];
    rotation?: BlockData['rotation'];
  };
};

export default WrappedMeshProps;
