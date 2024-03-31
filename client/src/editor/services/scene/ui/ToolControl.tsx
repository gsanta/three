import { useAppSelector } from '@/common/hooks/hooks';
import MeshRenderer from './MeshRenderer';
import { ThreeEvent } from '@react-three/fiber';
import { useCallback } from 'react';
import useEditorContext from '@/app/editor/EditorContext';

const ToolControl = () => {
  const { meshes, roots } = useAppSelector((selector) => selector.scene.present);
  const { selectedMeshIds } = useAppSelector((selector) => selector.scene.present);
  const { tool } = useEditorContext();

  const isSelected = (id: string) => selectedMeshIds?.includes(id);

  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      tool.onPointerDown(event);
      event.stopPropagation();
    },
    [tool],
  );

  return (
    <>
      {roots
        .filter((id) => !meshes[id].movable || !isSelected(id))
        .map((id) => (
          <MeshRenderer key={id} meshInfo={meshes[id]} meshProps={{ onPointerDown: handlePointerDown }} />
        ))}
    </>
  );
};

export default ToolControl;
