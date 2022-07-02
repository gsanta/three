import React, { useContext } from 'react';
import DataContext from '@/ui/DataContext';

type Props = {
  canvasRef: (node: HTMLCanvasElement) => void;
};

const Canvas = ({ canvasRef }: Props) => {
  const { mouseInput } = useContext(DataContext);

  useEffect(() => {
    if (canvasContext && webGLContext && canvas && !editor) {
      const newEditor = new Editor(canvas, canvasContext, webGLContext);
      setEditor(newEditor);
      (window as any).editor = newEditor;
    }
  }, [canvas, canvasContext, editor, webGLContext]);

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
