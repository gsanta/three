import { ThreeEvent } from '@react-three/fiber';
import { useCallback } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import useNotSelectedBlocks from '../../hooks/useNotSelectedBlocks';
import Block from '@/client/editor/types/Block';
import { useAppSelector } from '@/client/common/hooks/hooks';
import MeshRenderer from './MeshRenderer';

const ToolControl = () => {
  const { tool } = useEditorContext();

  const blocks = useNotSelectedBlocks();
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
      {blocks.map((block) => (
        <MeshRenderer
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
