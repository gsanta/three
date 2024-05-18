import useEditorContext from '@/app/editor/EditorContext';
import { useAppDispatch, useAppSelector } from '@/client/common/hooks/hooks';
import { findNearestValue, toDegree } from '@/client/editor/utils/mathUtils';
import { Box, Button, FormControl, FormLabel } from '@chakra-ui/react';
import useSelectedBlocks from '../hooks/useSelectedBlocks';
import RotationControl from './RotationControl';
import SizeControl from './SizeControl';
import RadioSwitchButton from '@/client/common/components/RadioSwitchButton';
import RadioSwitchGroup from '@/client/common/components/RadioSwitchGroup';
import { updateSelectTool } from '../../stores/tool/toolSlice';

const SelectToolOptions = () => {
  const selectedBlocks = useSelectedBlocks();
  const block = selectedBlocks[0];

  const { tool } = useEditorContext();

  const { blocks: templates, settings } = useAppSelector((state) => state.template.present);

  const selectedTemplate = templates.find((b) => b.name === block?.name);

  const {
    select: { templateName },
  } = useAppSelector((state) => state.tool);
  const { selectedPartNames } = useAppSelector((state) => state.block.present);
  const blockSettings = settings[selectedTemplate?.category || ''];
  const hasSelectedPart = Object.keys(selectedPartNames).length;

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
    if (block) {
      tool.getSelectTool().scaleMesh(scale, block);
    }
  };

  const handleApplyGeometry = () => {
    tool.getAddTool().addToSlot();
  };

  const scaleX = selectedTemplate
    ? findNearestValue(blockSettings.scale.x, block.scale[0] / selectedTemplate.scale[0])
    : 0;

  if (hasSelectedPart) {
    return (
      <Box padding="4" display="flex" flexDir="column" gap="4">
        <FormControl>
          <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
            Geometry type
          </FormLabel>
          <RadioSwitchGroup defaultValue={templateName} name="geometry-selector" onChange={handleGeometryChange}>
            {templates.map((template) => (
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
      {selectedTemplate && (
        <>
          <SizeControl axis="x" block={blockSettings} onChange={handleSizeChange} value={scaleX} />
          <RotationControl
            axis="y"
            block={blockSettings}
            onChange={(val) => handleRotationChange('y', val)}
            value={toDegree(block.rotation[1])}
          />
        </>
      )}
      <Button onClick={() => tool.getGroupTool().group()}>Group</Button>
      <Button onClick={() => tool.getGroupTool().ungroup()}>Ungroup</Button>
    </Box>
  );
};

export default SelectToolOptions;
