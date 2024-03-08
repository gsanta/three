import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls, Plane } from '@react-three/drei';
import { Environment } from './Environment';
import { useAppSelector } from '../../../../common/hooks/hooks';
import useEditorContext from '@/app/editor/EditorContext';
import useSelectedMesh from '../../builder/useSelectedMesh';
import SelectedMesh from './SelectedMesh';
import MeshRenderer from './MeshRenderer';

const App = () => {
  const { meshes } = useAppSelector((selector) => selector.scene.present);
  const selectedMesh = useSelectedMesh();
  const { tool } = useEditorContext();

  return (
    <Canvas style={{ backgroundColor: 'goldenrod' }} shadows camera={{ position: [0, 10, 15], fov: 25 }}>
      {selectedMesh && <SelectedMesh selectedMesh={selectedMesh} />}
      {meshes.map((meshInfo) => {
        const isSelectedMesh = meshInfo.id === selectedMesh?.id;
        if (isSelectedMesh) {
          return undefined;
        }
        return <MeshRenderer key={meshInfo.id} meshInfo={meshInfo} />;
      })}
      <mesh position={[5, 1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <Plane
        args={[10, 10]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[2, -0.1, 0]}
        onPointerDown={(e) => tool.onPointerDown(e)}
        onPointerMove={(e) => tool.onPointerMove(e)}
      >
        <meshStandardMaterial color="goldenrod" />
      </Plane>
      <Grid infiniteGrid />

      <Environment />
      <OrbitControls makeDefault />
    </Canvas>
  );
};

export default App;
