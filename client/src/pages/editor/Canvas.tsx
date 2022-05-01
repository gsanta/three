import React, { useContext } from 'react';
import DataContext from '@/ui/DataContext';
import useData from '@/ui/hooks/useData';
import Palette from '@/ui/components/Palette';

type Props = {
  canvasRef: (node: HTMLCanvasElement) => void;
};

const Canvas = ({ canvasRef }: Props) => {
  const { mouseInput } = useContext(DataContext);
  const [ selectedColor ] = useData('paletteData', 'selectedColor');

  return (
    <div>
      <Palette />
      <div
        onClick={(e) => {
          mouseInput?.onClick(e.nativeEvent);
        }}
      >
        <canvas ref={canvasRef} className="Canvas" data-testid="editor-canvas" />
      </div>
    </div>
  );
};

export default Canvas;
