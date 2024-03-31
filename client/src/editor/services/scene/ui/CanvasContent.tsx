import { Grid, OrbitControls, Plane } from '@react-three/drei';
import SelectedMesh from './SelectedMesh';
import MeshRenderer from './MeshRenderer';
import { useEffect } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/common/hooks/hooks';
import useSelectedMeshes from '../../../features/block/useSelectedMeshes';
import { CatmullRomCurve3, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';

const CanvasContent = () => {
  const { meshes, roots } = useAppSelector((selector) => selector.scene.present);
  const { selectedMeshIds } = useAppSelector((selector) => selector.scene.present);
  const selectedMeshes = useSelectedMeshes();
  const { tool, scene: sceneService } = useEditorContext();

  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    sceneService.setCamera(camera);
    sceneService.setScene(scene);
  }, [camera, scene, sceneService]);

  const nonMovableMeshesIds = selectedMeshes.filter((mesh) => mesh.name === 'cable').map((mesh) => mesh.id);
  const movableMeshes = selectedMeshes.filter((mesh) => mesh.name !== 'cable');

  return (
    <>
      {movableMeshes.length ? <SelectedMesh selectedMeshes={movableMeshes} /> : undefined}
      {roots.map((id) => {
        const meshInfo = meshes[id];
        const isSelectedMesh = selectedMeshIds?.includes(meshInfo.id) && !nonMovableMeshesIds.includes(meshInfo.id);
        if (isSelectedMesh) {
          return undefined;
        }
        return <MeshRenderer key={meshInfo.id} meshInfo={meshInfo} />;
      })}
      <mesh position={[5, 1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <mesh>
        <tubeGeometry
          args={[
            new CatmullRomCurve3(
              [new Vector3(0, 5, 0), new Vector3(5, 5, 0), new Vector3(5, 10, 0), new Vector3(10, 10, 0)],
              false,
              'catmullrom',
              0,
            ),
            70,
            0.02,
            50,
            false,
          ]}
        />
      </mesh>
      <Plane
        args={[10, 10]}
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
