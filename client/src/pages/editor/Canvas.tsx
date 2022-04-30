import React, { useContext } from 'react';
import Palette from '@/editor/components/palette/Palette';
import DataContext from '@/editor/ui/DataContext';
import useData from '@/editor/ui/hooks/useData';

type Props = {
  canvasRef: (node: HTMLCanvasElement) => void;
};

const Canvas = ({ canvasRef }: Props) => {
  const { mouseHandler } = useContext(DataContext);
  const [ selectedColor ] = useData('paletteData', 'selectedColor');

  return (
    <div>
      <Palette />
      <div
        onClick={(e) => {
          mouseHandler?.onClick(e.nativeEvent);
        }}
      >
        <canvas ref={canvasRef} className="Canvas" data-testid="editor-canvas" />
      </div>
    </div>
  );
};

export default Canvas;
