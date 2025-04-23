import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useCallback, useEffect, useRef } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import { ThreeEvent, useThree } from '@react-three/fiber';
import { useAppSelector } from '@/client/common/hooks/hooks';
import TemporaryCableRenderer from './TemporaryCableRenderer';
import RootMeshRenderer from './RootMeshRenderer';
import { Physics } from '@react-three/cannon';
import Car from './Car';
import Ground from './Ground';
import Track from './Track';
import BuildingScene from './BuildingScene';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { EffectComposer, Outline, Selection } from '@react-three/postprocessing';

const Scene = () => {
  const { tool, sceneStore: sceneService } = useEditorContext();

  const orbitControlRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (orbitControlRef.current) {
      sceneService.setOrbitControls(orbitControlRef.current);
      // const controls = orbitControlRef.current;

      // const onChange = () => {
      //   console.log('Camera position:', controls.object.position);
      //   console.log('Target position:', controls.target);
      // };

      // controls.addEventListener('end', onChange);

      // // Cleanup event listener on unmount
      // return () => {
      //   controls.removeEventListener('end', onChange);
      // };
    }
  }, [orbitControlRef, sceneService]);

  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);

  const blockIds = useAppSelector((selector) => selector.block.present.blockIds);
  const editMode = useAppSelector((selector) => selector.editor.editingMode);
  const editTargetBlock = useAppSelector((selector) => selector.editor.editingTargetBlock);
  const sceneMode = useAppSelector((selector) => selector.editor.mode);

  useEffect(() => {
    sceneService.setCamera(camera);
    sceneService.setScene(scene);
  }, [camera, scene, sceneService]);

  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      tool.onPointerDown(event);
      event.stopPropagation();
    },
    [tool],
  );

  const handlePointerEnter = useCallback(
    (event: ThreeEvent<PointerEvent>, partIndex?: string) => {
      tool.onPointerEnter(event, partIndex);
      event.stopPropagation();
    },
    [tool],
  );

  return (
    <>
      {editMode === 'wiring' && (
        <RootMeshRenderer
          key={editTargetBlock}
          blockId={editTargetBlock || ''}
          meshProps={{
            onPointerDown: handlePointerDown,
            onPointerEnter: handlePointerEnter,
          }}
          materialProps={{ opacity: 0.5, transparent: true }}
          slice="city"
        />
      )}

      <mesh position={[5, 1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <TemporaryCableRenderer />
      <OrbitControls makeDefault ref={orbitControlRef} />
      <Environment files="envmap.hdr" background={true} />

      <PerspectiveCamera makeDefault position={[0, 50, 75]} fov={25} />
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur edgeStrength={100} width={1000} />
        </EffectComposer>

        <>
          {sceneMode === 'building' ? (
            <BuildingScene />
          ) : (
            <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
              {blockIds.map((id) => {
                if (editTargetBlock === id) {
                  return;
                }

                return (
                  <RootMeshRenderer
                    key={id}
                    blockId={id}
                    meshProps={{
                      onPointerDown: handlePointerDown,
                      onPointerEnter: handlePointerEnter,
                    }}
                    slice="city"
                  />
                );
              })}
              <Track />
              <Ground />
              <Car />
            </Physics>
          )}
        </>
      </Selection>
    </>
  );
};

export default Scene;
