import { Canvas as ThreeCanvas } from '@react-three/fiber';
import useEditorContext from '@/app/editor/useEditorContext';
import Scene from './Scene';
import { useCallback } from 'react';
import BlockContextMenu from './BlockContextMenu/BlockContextMenu';
import GameActionPanel from './GameActionPanel';
import { OrbitControls } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import AddPanel from './AddPanel';

const Canvas = () => {
  // const { data, isSuccess } = useQuery({ queryKey: ['blocks'], queryFn: () => api.get('/api/block') });
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(setTemplates(data.data.items));
  //   }
  // }, [data, dispatch, isSuccess]);

  const { keyboard, sceneStore: scene } = useEditorContext();

  // const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasRef = useCallback(
    (canvasElement: HTMLCanvasElement) => {
      if (canvasElement) {
        scene.setCanvasElement(canvasElement);
      }
    },
    [scene],
  );

  const controlsRef = useCallback(
    (controls: OrbitControlsImpl | null) => {
      if (controls) {
        scene.setOrbitControls(controls);
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
    <div style={{ width: 'calc(100% - 50px)' }}>
      <ThreeCanvas
        onCreated={(canvasState) => {
          scene.setCanvasState(canvasState);
        }}
        style={{ backgroundColor: 'goldenrod' }}
        shadows
        // camera={{ position: [0, 50, 75], fov: 25 }}
        // orthographic
        gl={{ logarithmicDepthBuffer: true }}
        tabIndex={0}
        ref={canvasRef}
      >
        <Scene />
        <OrbitControls ref={controlsRef} />
      </ThreeCanvas>
      <BlockContextMenu />
      <div className="absolute flex flex-col gap-2 left-[70px] bottom-[50px]">
        <AddPanel />
        <GameActionPanel />
      </div>
    </div>
  );
};

export default Canvas;
