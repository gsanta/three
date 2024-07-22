import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useCallback, useEffect } from 'react';
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

const Scene = () => {
  const { tool, scene: sceneService } = useEditorContext();

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

  if (sceneMode === 'building') {
    return <BuildingScene />;
  }

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
        />
      )}

      <mesh position={[5, 1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <TemporaryCableRenderer />
      <OrbitControls makeDefault />
      <Environment files="envmap.hdr" background={true} />

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
            />
          );
        })}
        <Track />
        <Ground />
        <Car />
        <PerspectiveCamera makeDefault position={[0, 50, 75]} fov={25} />
        {/* <OrthographicCamera makeDefault position={[0, 1, 0]} /> */}
      </Physics>
    </>
  );
};

export default Scene;
