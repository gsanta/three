import { memo } from 'react';
import React from 'react';

type EnvironmentProps = {
  direction?: [number, number, number];
};

export const Environment = memo(({ direction = [5, 5, 5] }: EnvironmentProps) => (
  <>
    <ambientLight />
    <directionalLight position={direction} intensity={0.5} shadow-mapSize={1024} castShadow />
  </>
));
