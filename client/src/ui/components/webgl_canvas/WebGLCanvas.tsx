import React from 'react';

type Props = {
  canvasRef: (node: HTMLCanvasElement) => void;
};

const WebGLCanvas = ({ canvasRef }: Props) => {
  return (
    <div>
      <canvas ref={canvasRef} className="Canvas" />
    </div>
  );
};

export default WebGLCanvas;
