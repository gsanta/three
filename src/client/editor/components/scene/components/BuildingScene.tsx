import { useAppSelector } from '@/client/common/hooks/hooks';
import RootMeshRenderer from './RootMeshRenderer';
import { Physics } from '@react-three/cannon';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';
import { addVector } from '@/client/editor/utils/vectorUtils';
import Ground from './Ground';

const BuildingScene = () => {
  const editedBuildingId = useAppSelector((selector) => selector.editor.editedBuilding);
  const editedBuilding = useAppSelector((selector) => selector.block.present.blocks[editedBuildingId || '']);

  const cameraRef = useRef<any>();

  useFrame(() => {
    if (cameraRef.current && editedBuilding) {
      const worldPosition = new Vector3();
      cameraRef.current.getWorldPosition(worldPosition);
      console.log('Camera World Position:', worldPosition);
      cameraRef.current.lookAt(new Vector3(...editedBuilding.position));
    }
  });

  if (!editedBuildingId) {
    return;
  }

  return (
    <>
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
        <RootMeshRenderer key={editedBuildingId} blockId={editedBuildingId} />
        <Ground />
      </Physics>
      {/* <PerspectiveCamera makeDefault position={editedBuilding.position} fov={25} /> */}
      <directionalLight
        position={[editedBuilding.position[0], 50, editedBuilding.position[2] + 50]}
        // castShadow
        intensity={1}
      />
      {/* <perspectiveCamera ref={cameraRef} position={addVector(editedBuilding.position, [0, 5, 0])} />; */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[editedBuilding.position[0], 50, editedBuilding.position[2] + 50]}
        fov={25}
      />

      {/* <OrbitControls makeDefault target={new Vector3(...editedBuilding.position)} /> */}
    </>
  );
};

export default BuildingScene;
