import React, { useContext } from 'react';
import DataContext from '@/ui/DataContext';

type Props = {
  canvasRef: (node: HTMLCanvasElement) => void;
};

const Canvas = ({ canvasRef }: Props) => {
  const { mouseInput } = useContext(DataContext);

  return (
    <div>
      <div
        onClick={(e) => mouseInput?.onClick(e.nativeEvent)}
        onMouseMove={(e) => mouseInput?.onMove(e.nativeEvent)}
        onMouseDown={() => mouseInput?.onDown()}
        onMouseUp={() => mouseInput?.onUp()}
        onWheel={(e) => mouseInput?.onWheel(e.nativeEvent)}
      >
        <canvas ref={canvasRef} className="Canvas" data-testid="editor-canvas" />
      </div>
    </div>
  );
};

export default Canvas;
