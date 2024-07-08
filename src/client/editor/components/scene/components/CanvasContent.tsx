import { Grid, OrbitControls, Plane } from '@react-three/drei';
import { useCallback, useEffect } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import { ThreeEvent, useThree } from '@react-three/fiber';
import { useAppSelector } from '@/client/common/hooks/hooks';
import TemporaryCableRenderer from './TemporaryCableRenderer';
import RootMeshRenderer from './RootMeshRenderer';

const CanvasContent = () => {
  const { tool, scene: sceneService } = useEditorContext();

  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);

  const blockIds = useAppSelector((selector) => selector.block.present.blockIds);
  const editMode = useAppSelector((selector) => selector.editor.editingMode);
  const editTargetBlock = useAppSelector((selector) => selector.editor.editingTargetBlock);

  useEffect(() => {
    sceneService.setCamera(camera);
    sceneService.setScene(scene);
  }, [camera, scene, sceneService]);

  const handleDefaultPointerEnter = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      tool.onPointerEnter(event);
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
        />
      )}
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
      <mesh position={[5, 1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <TemporaryCableRenderer />
      <Plane
        args={[100, 100]}
        name="plane"
        onPointerEnter={handleDefaultPointerEnter}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[2, -0.1, 0]}
        onPointerDown={(e) => tool.onPointerDown(e)}
        onPointerUp={() => tool.onPointerUp()}
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
