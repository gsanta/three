import { Canvas as ThreeCanvas } from '@react-three/fiber';
import useEditorContext from '@/app/editor/useEditorContext';
import Scene from './Scene';
import { useCallback, useMemo } from 'react';
import GameActionPanel from './GameActionPanel';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import AddPanel from './AddPanel';
import { useAppSelector } from '@/client/common/hooks/hooks';
import SelectionPanel from './SelectionPanel';
import CableDrawingPanel from './CableDrawingPanel';

const Canvas = () => {
  // const { data, isSuccess } = useQuery({ queryKey: ['blocks'], queryFn: () => api.get('/api/block') });
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(setTemplates(data.data.items));
  //   }
  // }, [data, dispatch, isSuccess]);

  const { sceneStore: scene } = useEditorContext();

  const selectedRootBlockIds = useAppSelector((state) => state.blockCategory.selectedRootBlockIds);
  const currentActionPanel = useAppSelector((state) => state.blockCategory.currentActionPanel);

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

  const actionPanel = useMemo(() => {
    if (currentActionPanel === 'add') {
      return <AddPanel />;
    }

    if (currentActionPanel === 'selection') {
      return <SelectionPanel />;
    }

    if (currentActionPanel === 'cable-drawing') {
      return <CableDrawingPanel />;
    }

    return undefined;
  }, [currentActionPanel]);

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
      </ThreeCanvas>
      <div className="absolute flex flex-col gap-2 left-[70px] bottom-[50px]">
        {actionPanel}
        <GameActionPanel />
      </div>
    </div>
  );
};

export default Canvas;
