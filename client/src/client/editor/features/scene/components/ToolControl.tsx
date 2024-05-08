import { ThreeEvent } from '@react-three/fiber';
import { useCallback } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import useNotSelectedBlocks from '../../block/components/hooks/useNotSelectedBlocks';
import { ModelMesh } from '../../block/components/meshes/ModelMesh';
import Block from '@/client/editor/types/Block';
import { useAppSelector } from '@/client/common/hooks/hooks';

const ToolControl = () => {
  const { tool } = useEditorContext();

  const blocks = useNotSelectedBlocks();
  const movableBlocks = blocks.filter((mesh) => mesh.movable);
  const { selectedPartNames } = useAppSelector((selector) => selector.block.present);

  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      tool.onPointerDown(event);
      event.stopPropagation();
    },
    [tool],
  );

  return (
    <>
      {movableBlocks.map((block) => (
        <ModelMesh
          key={block.id}
          block={block as Block<'model'>}
          meshProps={{ onPointerDown: handlePointerDown }}
          selectedParts={selectedPartNames[block.id]}
        />
      ))}
    </>
  );
};

export default ToolControl;
