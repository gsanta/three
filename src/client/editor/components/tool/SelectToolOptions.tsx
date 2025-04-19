import useEditorContext from '@/app/editor/EditorContext';
import { Box } from '@chakra-ui/react';
import useSelectedBlocks from '../hooks/useSelectedBlocks';
import IconButton from '@/client/common/components/IconButton';

const SelectToolOptions = () => {
  const selectedBlocks = useSelectedBlocks();
  const block = selectedBlocks[0];

  const { tool } = useEditorContext();

  const handleRotationChange = (direction: 'x' | 'y' | 'z', val: number) => {
    if (block) {
      tool.getSelectTool().rotateMesh(direction, val);
    }
  };

  return (
    <Box display="flex" gap="1rem">
      <IconButton iconName="BiRotateLeft" onClick={() => handleRotationChange('y', 30)} tooltip="Rotate left" />
      <IconButton iconName="BiRotateRight" onClick={() => handleRotationChange('y', 30)} tooltip="Rotate right" />
    </Box>
  );
};

export default SelectToolOptions;
