import useEditorContext from '@/app/editor/EditorContext';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

const BuildingScene = () => {
  const { scene: sceneService } = useEditorContext();

  useEffect(() => {
    sceneService.getCamera().position.set(21, 23, 33);
    sceneService.getOrbitControls().update();
  }, [sceneService]);
  // const editedBuildingId = useAppSelector((selector) => selector.editor.editedBuilding);
  // const editedBuilding = useAppSelector((selector) => selector.block.present.blocks[editedBuildingId || '']);

  // const cameraRef = useRef<PerspectiveCamera>(null);

  // useFrame(() => {
  //   if (cameraRef.current && editedBuilding) {
  //     const worldPosition = new Vector3();
  //     cameraRef.current.getWorldPosition(worldPosition);
  //     console.log('Camera World Position:', worldPosition);
  //     cameraRef.current.lookAt(new Vector3(...editedBuilding.position));
  //   }
  // });

  // if (!editedBuildingId) {
  //   return;
  // }

  // return (
  //   <>
  //     <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
  //       <RootMeshRenderer key={editedBuildingId} blockId={editedBuildingId} />
  //       <Ground />
  //     </Physics>
  //     {/* <PerspectiveCamera makeDefault position={editedBuilding.position} fov={25} /> */}
  //     <directionalLight
  //       position={[editedBuilding.position[0], 50, editedBuilding.position[2] + 50]}
  //       // castShadow
  //       intensity={1}
  //     />
  //     {/* <perspectiveCamera ref={cameraRef} position={addVector(editedBuilding.position, [0, 5, 0])} />; */}
  //     <PerspectiveCameraComp
  //       ref={cameraRef}
  //       makeDefault
  //       position={[editedBuilding.position[0], 50, editedBuilding.position[2] + 50]}
  //       fov={25}
  //     />

  //     {/* <OrbitControls makeDefault target={new Vector3(...editedBuilding.position)} /> */}
  //   </>

  const scene = useGLTF('/room.glb');

  const { nodes, materials } = useGLTF('/room.glb');
  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials['Material.001']}
        position={[0, 4, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials['Material.002']}
        position={[0, 1, 0]}
        scale={[6.282, 1, 6.282]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall1.geometry}
        material={materials['Material.002']}
        position={[0, 1, 0]}
        scale={[6.282, 1, 6.282]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall2.geometry}
        material={materials['Material.002']}
        position={[0, 1, 0]}
        scale={[6.282, 1, 6.282]}
      />
    </group>
  );
};

export default BuildingScene;
