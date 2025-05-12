import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useCallback, useEffect, useRef } from 'react';
import useEditorContext from '@/app/editor/useEditorContext';
import { ThreeEvent, useThree } from '@react-three/fiber';
import { useAppSelector } from '@/client/common/hooks/hooks';
import TemporaryCableRenderer from './TemporaryCableRenderer';
import RootMeshRenderer from './RootMeshRenderer';
import { Physics } from '@react-three/cannon';
import Car from './Car';
import Ground from './Ground';
import Track from './Track';
import { LightningStrike, OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { EffectComposer, Outline, Selection } from '@react-three/postprocessing';
import { Mesh, MeshBasicMaterial, Vector3 } from 'three';

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
  const editTargetBlock = useAppSelector((selector) => selector.grid.editingTargetBlock);

  useEffect(() => {
    sceneService.setCamera(camera);
    sceneService.setScene(scene);

    const lightningStrike = new LightningStrike({
      sourceOffset: new Vector3(10, 20, 10),
      destOffset: new Vector3(12, 10, 10),
      radius0: 0.05,
      radius1: 0.05,
      minRadius: 1,
      maxIterations: 7,
      isEternal: true,

      timeScale: 0.7,

      propagationTimeFactor: 0.05,
      vanishingTimeFactor: 0.95,
      subrayPeriod: 2.5,
      subrayDutyCycle: 0.3,
      maxSubrayRecursion: 3,
      ramification: 7,
      recursionProbability: 0.6,

      roughness: 0.85,
      straightness: 0.68,
    });
    const lightningStrikeMesh = new Mesh(lightningStrike, new MeshBasicMaterial({ color: 0xffffff }));

    let t = 0;
    setInterval(() => {
      t += 0.01;
      lightningStrike.update(t);
    }, 20);

    scene.add(lightningStrikeMesh);
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
        </>
      </Selection>
    </>
  );
};

export default Scene;
