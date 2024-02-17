import { memo } from 'react';
import { AccumulativeShadows, RandomizedLight, Environment as EnvironmentImpl, Plane } from '@react-three/drei';
import React from 'react';
import { DoubleSide } from 'three';

type EnvironmentProps = {
  direction?: [number, number, number];
};

export const Environment = memo(({ direction = [5, 5, 5] }: EnvironmentProps) => (
  <>
    <ambientLight />
    <directionalLight position={direction} intensity={0.5} shadow-mapSize={1024} castShadow />
    <AccumulativeShadows
      temporal
      frames={100}
      color="orange"
      colorBlend={2}
      toneMapped={true}
      alphaTest={0.75}
      opacity={2}
      scale={12}
    >
      <RandomizedLight intensity={Math.PI} amount={8} radius={4} ambient={0.5} position={[5, 5, -10]} bias={0.001} />
    </AccumulativeShadows>
  </>
));
