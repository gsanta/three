import React from 'react';
import useLoadEngine from '../engine/hooks/useLoadEngine';

const RenderCanvas = () => {
  const [elRef] = useLoadEngine();

  return <canvas ref={elRef} id="renderCanvas" touch-action="none"></canvas>;
};

export default RenderCanvas;
