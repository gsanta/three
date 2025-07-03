import { Canvas as ThreeCanvas } from '@react-three/fiber';
import useEditorContext from '@/app/editor/useEditorContext';
import Scene from './Scene';
import { useCallback } from 'react';

const Canvas = () => {
  // const { data, isSuccess } = useQuery({ queryKey: ['blocks'], queryFn: () => api.get('/api/block') });
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(setTemplates(data.data.items));
  //   }
  // }, [data, dispatch, isSuccess]);

  const { sceneStore: scene } = useEditorContext();

  // const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasRef = useCallback(
    (canvasElement: HTMLCanvasElement) => {
      if (canvasElement) {
        scene.setCanvasElement(canvasElement);
      }
    },
    [scene],
  );

  // const controlsRef = useRef<OrbitControlsImpl | null>(null);

  // Example: update the target when `center` changes
  // useEffect(() => {
  //   if (controlsRef.current) {
  //     controlsRef.current.target.copy(center);
  //     controlsRef.current.update();
  //   }
  // }, [center]);

  return (
    <div style={{ width: 'calc(100% - 50px)', height: '100%' }}>
      <ThreeCanvas
        onCreated={(canvasState) => {
          scene.setCanvasState(canvasState);
        }}
        style={{ width: '100%', height: '100%', backgroundColor: 'goldenrod' }}
        shadows
        // camera={{ position: [0, 50, 75], fov: 25 }}
        // orthographic
        gl={{ logarithmicDepthBuffer: true }}
        tabIndex={0}
        ref={canvasRef}
      >
        <Scene />
      </ThreeCanvas>
    </div>
  );
};

export default Canvas;
