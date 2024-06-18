import { Grid, OrbitControls, Plane } from '@react-three/drei';
import { useCallback, useEffect } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import { ThreeEvent, useThree } from '@react-three/fiber';
import useNotSelectedBlocks from '../../hooks/useNotSelectedBlocks';
import { useAppSelector } from '@/client/common/hooks/hooks';
import MoveControl from './MoveControl';
import MeshHierarchyRenderer from './MeshHierarchyRenderer';
import TemporaryCableRenderer from './TemporaryCableRenderer';
import { TestMesh } from '../../mesh/TestMesh';
import MeshRenderer from './MeshRenderer';
import Block from '@/client/editor/types/Block';

const CanvasContent = () => {
  const { tool, scene: sceneService } = useEditorContext();

  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);

  const blocks = useNotSelectedBlocks();
  const { selectedPartIndexes } = useAppSelector((selector) => selector.block.present);

  useEffect(() => {
    sceneService.setCamera(camera);
    sceneService.setScene(scene);
  }, [camera, scene, sceneService]);

  const handleDefaultPointerEnter = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      tool.onPointerEnter(event);
      // event.stopPropagation();
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
      {blocks
        .filter((block) => !block.parent)
        .map((block) => (
          <MeshRenderer
            key={block.id}
            block={block as Block<'model'>}
            meshProps={{
              onPointerDown: handlePointerDown,
              onPointerEnter: handlePointerEnter,
            }}
            selectedParts={selectedPartIndexes[block.id]}
          />
        ))}
      <MoveControl onPointerDown={handlePointerDown} onPointerEnter={handlePointerEnter} />
      <mesh position={[5, 1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <TestMesh />
      <TemporaryCableRenderer />
      <Plane
        args={[100, 100]}
        name="plane"
        onPointerEnter={handleDefaultPointerEnter}
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
