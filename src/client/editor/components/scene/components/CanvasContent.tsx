import { Grid, OrbitControls, Plane } from '@react-three/drei';
import MoveControl from './MoveControl';
import { useEffect } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import { useThree } from '@react-three/fiber';
import ToolControl from './ToolControl';

const CanvasContent = () => {
  const { tool, scene: sceneService } = useEditorContext();

  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    sceneService.setCamera(camera);
    sceneService.setScene(scene);
  }, [camera, scene, sceneService]);

  return (
    <>
      <ToolControl />
      <MoveControl />
      <mesh position={[5, 1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <Plane
        args={[100, 100]}
        name="plane"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[2, -0.1, 0]}
        onPointerDown={(e) => tool.onPointerDown(e)}
        onPointerMove={(e) => tool.onPointerMove(e)}
      >
        <meshStandardMaterial color="goldenrod" />
      </Plane>
      <Grid infiniteGrid />
      <OrbitControls makeDefault />
    </>
  );
};

export default CanvasContent;
