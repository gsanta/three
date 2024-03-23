import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { Environment } from './Environment';
import useEditorContext from '@/app/editor/EditorContext';
import CanvasContent from './CanvasContent';

const Canvas = () => {
  const { keyboard } = useEditorContext();

  return (
    <ThreeCanvas
      onKeyDown={(e) => keyboard.onKeyDown(e.nativeEvent)}
      style={{ backgroundColor: 'goldenrod' }}
      shadows
      camera={{ position: [0, 10, 15], fov: 25 }}
      tabIndex={0}
    >
      <CanvasContent />
      <Environment />
    </ThreeCanvas>
  );
};

export default Canvas;
