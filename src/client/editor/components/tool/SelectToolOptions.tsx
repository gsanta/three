import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';
import { findNearestValue, toDegree } from '@/client/editor/utils/mathUtils';
import { Box, Tooltip } from '@chakra-ui/react';
import useSelectedBlocks from '../hooks/useSelectedBlocks';
import RotationControl from './RotationControl';
import SizeControl from './SizeControl';
import DeviceControl from './DeviceControl';
import Device from '../../types/block/Device';
import IconButton from '@/client/common/components/IconButton';

const SelectToolOptions = () => {
  const selectedBlocks = useSelectedBlocks();
  const block = selectedBlocks[0];

  const { tool } = useEditorContext();

  const { blocks: templates, settings } = useAppSelector((state) => state.blockType);

  const selectedTemplate = templates.find((b) => b.type === block?.type);

  const { decorations } = useAppSelector((state) => state.block.present);
  const blockSettings = settings[selectedTemplate?.category || ''];

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

  const scaleX =
    selectedTemplate && blockSettings
      ? findNearestValue(blockSettings.scale.x, block.scale[0] / selectedTemplate.scale[0])
      : 0;

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      {selectedTemplate && blockSettings && (
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
      {block?.decorations.map((decoration) => {
        // if (decoration === 'devices') {
        //   return <DeviceControl device={decorations.devices[block.id] as Device} />;
        // }

        return undefined;
      })}

      <Box display="flex" gap="1rem">
        <Tooltip label="Rotate left" placement="right">
          <IconButton
            src="/icons/arrow_left_rotate_icon.png"
            variant="outline"
            onClick={() => handleRotationChange('y', 30)}
          />
        </Tooltip>
        <Tooltip label="Rotate right" placement="right">
          <IconButton
            src="/icons/arrow_right_rotate_icon.png"
            variant="outline"
            onClick={() => handleRotationChange('y', -30)}
          />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default SelectToolOptions;
