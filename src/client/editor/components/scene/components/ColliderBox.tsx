import Num3 from '@/client/editor/types/Num3';
import { useBox } from '@react-three/cannon';

const debug = false;

type ColliderBoxProps = {
  position: Num3;
  scale: Num3;
};

export const ColliderBox = ({ position, scale }: ColliderBoxProps) => {
  useBox(() => ({
    args: scale,
    position,
    type: 'Static',
  }));

  return (
    debug && (
      <mesh>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
    )
  );
};
