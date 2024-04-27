import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';
import { findNearestValue, toDegree } from '@/client/editor/utils/mathUtils';
import { Box, Button } from '@chakra-ui/react';
import useSelectedBlocks from '../../components/hooks/useSelectedBlocks';
import RotationControl from '../../components/RotationControl';
import SizeControl from '../../components/SizeControl';
import useBlock from '../../components/hooks/useBlock';
import Block from '@/client/editor/types/Block';

const SelectToolOptionsContent = ({ block }: { block: Block }) => {
  const { tool } = useEditorContext();

  const selectedBlock = useBlock(block?.name);
  const { settings } = useAppSelector((state) => state.template.present);
  const blockSettings = settings[selectedBlock.category];

  const handleRotationChange = (direction: 'x' | 'y' | 'z', val: number) => {
    if (block) {
      tool.getSelectTool().rotateMesh(direction, val);
    }
  };

  const handleSizeChange = (scale: number) => {
    tool.getSelectTool().scaleMesh(scale, block);
  };

  const scaleX = findNearestValue(blockSettings.scale.x, block.scale[0] / selectedBlock.scale[0]);

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      <SizeControl axis="x" block={blockSettings} onChange={handleSizeChange} value={scaleX} />
      {selectedBlock && (
        <RotationControl
          axis="y"
          block={blockSettings}
          onChange={(val) => handleRotationChange('y', val)}
          value={toDegree(block.rotation[1])}
        />
      )}
      <Button onClick={() => tool.getGroupTool().group()}>Group</Button>
      <Button onClick={() => tool.getGroupTool().ungroup()}>Ungroup</Button>
      <Button onClick={() => tool.getSelectTool().selectParent(block.id)}>Select parent</Button>
    </Box>
  );
};

const SelectToolOptions = () => {
  const selectedBlocks = useSelectedBlocks();

  if (!selectedBlocks.length) {
    return null;
  }

  return <SelectToolOptionsContent block={selectedBlocks[0]} />;
};

export default SelectToolOptions;
