import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import { setBlockRotation, setSelectedGeometry } from '../../stores/blockType/blockTypeSlice';
import { BlockName } from '../../types/BlockType';
import useTemplate from '../hooks/useTemplate';
import RotationControl from './RotationControl';
import Dropdown from '@/client/common/components/Dropdown/Dropdown';
import DropdownButton from '@/client/common/components/Dropdown/DropdownButton';
import DropdownItem from '@/client/common/components/Dropdown/DropdownItem';

const AddToolOptions = () => {
  const { blocks, selectedBlockName } = useAppSelector((state) => state.blockType);
  const selectedBlock = useTemplate(selectedBlockName);

  const { settings, selectedSettings } = useAppSelector((state) => state.blockType);
  const blockSettings = selectedBlock && settings[selectedBlock.category];
  const selectedValues = selectedBlock && selectedSettings[selectedBlock.category];

  const dispatch = useAppDispatch();

  const handleGeometryChange = (val: string) => {
    dispatch(setSelectedGeometry(val as BlockName));
  };

  const handleRotationChange = (axis: 'x' | 'y' | 'z', rotation: number) => {
    if (selectedBlock) {
      dispatch(setBlockRotation({ axis, blockName: selectedBlock.type, rotation }));
    }
  };

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      <FormControl>
        <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
          Blocks
        </FormLabel>
        <Dropdown id="add-blocks" onChange={handleGeometryChange} value={selectedBlockName}>
          <DropdownButton />
          {/* <DropdownItem value="a">A</DropdownItem>
          <DropdownItem value="b">B</DropdownItem> */}
          {blocks.map((block) => (
            <DropdownItem key={block.type} value={block.type}>
              {block.type}
            </DropdownItem>
          ))}
        </Dropdown>
      </FormControl>
      {blockSettings && selectedValues && (
        <RotationControl
          axis="y"
          block={blockSettings}
          onChange={(val) => handleRotationChange('y', val)}
          value={selectedValues.rotation[1]}
        />
      )}
    </Box>
  );
};

export default AddToolOptions;
