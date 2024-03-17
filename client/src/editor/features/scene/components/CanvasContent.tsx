import { Grid, OrbitControls, Plane } from '@react-three/drei';
import SelectedMesh from './SelectedMesh';
import MeshRenderer from './MeshRenderer';
import React from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/common/hooks/hooks';
import useSelectedMeshes from '../../builder/useSelectedMeshes';

const CanvasContent = () => {
  const { meshes, roots } = useAppSelector((selector) => selector.scene.present);
  const { selectedMeshIds } = useAppSelector((selector) => selector.builder.present);
  const selectedMeshes = useSelectedMeshes();
  const { tool } = useEditorContext();

  return (
    <>
      {selectedMeshes.length ? <SelectedMesh selectedMeshes={selectedMeshes} /> : undefined}
      {roots.map((id) => {
        const meshInfo = meshes[id];
        const isSelectedMesh = selectedMeshIds?.includes(meshInfo.id);
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

      <OrbitControls makeDefault />
    </>
  );
};

export default CanvasContent;
