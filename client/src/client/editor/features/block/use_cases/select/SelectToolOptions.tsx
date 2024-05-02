import useEditorContext from '@/app/editor/EditorContext';
import { useAppDispatch, useAppSelector } from '@/client/common/hooks/hooks';
import { findNearestValue, toDegree } from '@/client/editor/utils/mathUtils';
import { Box, Button, FormControl, FormLabel } from '@chakra-ui/react';
import useSelectedBlocks from '../../components/hooks/useSelectedBlocks';
import RotationControl from '../../components/RotationControl';
import SizeControl from '../../components/SizeControl';
import useBlock from '../../components/hooks/useBlock';
import Block from '@/client/editor/types/Block';
import RadioSwitchButton from '@/client/common/components/RadioSwitchButton';
import RadioSwitchGroup from '@/client/common/components/RadioSwitchGroup';
import { updateSelectTool } from '../../../tool/toolSlice';

const SelectToolOptionsContent = ({ block }: { block: Block }) => {
  const { tool } = useEditorContext();

  const selectedBlock = useBlock(block?.name);
  const { blocks, settings } = useAppSelector((state) => state.template.present);
  const {
    select: { templateName },
  } = useAppSelector((state) => state.tool);
  const { selectedPartNames } = useAppSelector((state) => state.block.present);
  const blockSettings = settings[selectedBlock.category];
  const selectedPartName = selectedPartNames[0];

  const dispatch = useAppDispatch();

  const handleGeometryChange = (val: string) => {
    dispatch(updateSelectTool({ templateName: val }));
  };

  const handleRotationChange = (direction: 'x' | 'y' | 'z', val: number) => {
    if (block) {
      tool.getSelectTool().rotateMesh(direction, val);
    }
  };

  const handleSizeChange = (scale: number) => {
    tool.getSelectTool().scaleMesh(scale, block);
  };

  const handleApplyGeometry = () => {
    tool.getAddTool().addToSlot();
  };

  const scaleX = findNearestValue(blockSettings.scale.x, block.scale[0] / selectedBlock.scale[0]);

  if (selectedPartName) {
    return (
      <Box padding="4" display="flex" flexDir="column" gap="4">
        <FormControl>
          <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
            Geometry type
          </FormLabel>
          <RadioSwitchGroup defaultValue={templateName} name="geometry-selector" onChange={handleGeometryChange}>
            {blocks.map((template) => (
              <RadioSwitchButton key={template.name} value={template.name}>
                {template.name}
              </RadioSwitchButton>
            ))}
          </RadioSwitchGroup>
        </FormControl>
        <Button onClick={handleApplyGeometry}>Apply</Button>
      </Box>
    );
  }

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
      <Button onClick={() => tool.getSelectTool().selectRoot(block.id)}>Select parent</Button>
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
