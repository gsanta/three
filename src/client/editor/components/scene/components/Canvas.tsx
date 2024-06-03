import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { Environment } from './Environment';
import useEditorContext from '@/app/editor/EditorContext';
import CanvasContent from './CanvasContent';
import { useCallback, useEffect } from 'react';
import SkyBox from './TheSkyBox';
import api from '@/client/common/utils/api';
import { useQuery } from '@tanstack/react-query';
import { setTemplates } from '@/client/editor/stores/template/templateSlice';
import { useAppDispatch } from '@/client/common/hooks/hooks';

const Canvas = () => {
  const { data, isSuccess } = useQuery({ queryKey: ['blocks'], queryFn: () => api.get('/api/block') });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTemplates(data.data.items));
    }
  }, [data, dispatch, isSuccess]);

  const { keyboard, scene } = useEditorContext();

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
      camera={{ position: [0, 50, 75], fov: 25 }}
      tabIndex={0}
      ref={canvasRef}
    >
      {data && <CanvasContent />}
      <Environment />
      <SkyBox />
    </ThreeCanvas>
  );
};

export default Canvas;
