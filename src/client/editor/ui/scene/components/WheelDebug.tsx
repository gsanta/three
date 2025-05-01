import { Ref } from 'react';
import { Group, Object3DEventMap } from 'three';

const debug = true;

type WheelDebugProps = {
  radius: number;
  wheelRef: Ref<Group<Object3DEventMap>> | undefined;
};

export const WheelDebug = ({ radius, wheelRef }: WheelDebugProps) => {
  return (
    debug && (
      <group ref={wheelRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[radius, radius, 0.015, 16]} />
          <meshNormalMaterial transparent={true} opacity={0.25} />
        </mesh>
      </group>
    )
  );
};
