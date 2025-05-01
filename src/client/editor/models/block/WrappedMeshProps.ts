import BlockData from '@/client/editor/models/block/BlockData';
import { MeshProps, MeshStandardMaterialProps, ThreeEvent } from '@react-three/fiber';

type WrappedMeshProps = {
  additions?: {
    position: BlockData['position'];
  };
  block: BlockData;
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
