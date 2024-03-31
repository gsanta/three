import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { Environment } from './Environment';
import useEditorContext from '@/app/editor/EditorContext';
import CanvasContent from './CanvasContent';
import { useCallback } from 'react';

const Canvas = () => {
  const { keyboard, scene, tool } = useEditorContext();

  // const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasRef = useCallback(
    (canvasElement: HTMLCanvasElement) => {
      if (canvasElement) {
        scene.setCanvasElement(canvasElement);
      }
    },
    [scene],
  );

  return (
    <ThreeCanvas
      onKeyDown={(e) => keyboard.onKeyDown(e.nativeEvent)}
      style={{ backgroundColor: 'goldenrod' }}
      shadows
      camera={{ position: [0, 10, 15], fov: 25 }}
      tabIndex={0}
      ref={canvasRef}
    >
      <CanvasContent />
      <Environment />
    </ThreeCanvas>
  );
};

export default Canvas;
