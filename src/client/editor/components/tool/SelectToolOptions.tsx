import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';
import { findNearestValue, toDegree } from '@/client/editor/utils/mathUtils';
import { Box, Tooltip } from '@chakra-ui/react';
import useSelectedBlocks from '../hooks/useSelectedBlocks';
import RotationControl from './RotationControl';
import SizeControl from './SizeControl';
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
          <button className="btn btn-square btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              className="size-[1.2em]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
          {/* <IconButton
            src="/icons/arrow_right_rotate_icon.png"
            variant="outline"
            onClick={() => handleRotationChange('y', -30)}
          /> */}
        </Tooltip>
      </Box>
    </Box>
  );
};

export default SelectToolOptions;
