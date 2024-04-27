import { useAppSelector } from '@/client/common/hooks/hooks';
import MeshRenderer from './MeshRenderer';
import { ThreeEvent } from '@react-three/fiber';
import { useCallback } from 'react';
import useEditorContext from '@/app/editor/EditorContext';

const ToolControl = () => {
  const { blocks: meshes, rootBlocksIds: roots } = useAppSelector((selector) => selector.blocks.present);
  const { selectedBlockIds: selectedMeshIds } = useAppSelector((selector) => selector.blocks.present);
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
