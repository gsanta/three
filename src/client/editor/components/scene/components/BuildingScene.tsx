import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';
import { Physics } from '@react-three/cannon';
import { useCallback, useEffect } from 'react';
import RootMeshRenderer from './RootMeshRenderer';
import { ThreeEvent } from '@react-three/fiber';
import { Plane } from '@react-three/drei';

const BuildingScene = () => {
  const { scene: sceneService, tool } = useEditorContext();

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

  // const scene = useGLTF('/room.glb');
  const blockIds = useAppSelector((selector) => selector.building.present.blockIds);

  const handlePointerEnter = useCallback(
    (event: ThreeEvent<PointerEvent>, partIndex?: string) => {
      tool.onPointerEnter(event, partIndex);
      event.stopPropagation();
    },
    [tool],
  );

  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      tool.onPointerDown(event);
      event.stopPropagation();
    },
    [tool],
  );

  return (
    <>
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
        {blockIds.map((id) => {
          return (
            <RootMeshRenderer
              key={id}
              blockId={id}
              slice="building"
              meshProps={{
                onPointerDown: handlePointerDown,
                onPointerEnter: handlePointerEnter,
                onPointerUp: () => tool.onPointerUp(),
              }}
            />
          );
        })}
      </Physics>
      <Plane
        args={[40, 40]}
        rotation-x={-Math.PI * 0.5}
        onPointerUp={() => tool.onPointerUp()}
        onPointerDown={handlePointerDown}
      >
        <meshBasicMaterial color="black" />
      </Plane>
    </>
  );

  // const { nodes, materials } = useGLTF('/room.glb');
  // return (
  //   <group>
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={(nodes.Cube as Mesh).geometry}
  //       material={materials['Material.001']}
  //       position={[0, 4, 0]}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={(nodes.Cube001 as Mesh).geometry}
  //       material={materials['Material.002']}
  //       position={[0, 1, 0]}
  //       scale={[6.282, 1, 6.282]}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={(nodes.wall1 as Mesh).geometry}
  //       material={materials['Material.002']}
  //       position={[0, 1, 0]}
  //       scale={[6.282, 1, 6.282]}
  //     />
  //     <mesh
  //       castShadow
  //       receiveShadow
  //       geometry={(nodes.wall2 as Mesh).geometry}
  //       material={materials['Material.002']}
  //       position={[0, 1, 0]}
  //       scale={[6.282, 1, 6.282]}
  //     />
  //   </group>
  // );
};

export default BuildingScene;
