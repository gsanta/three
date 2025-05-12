import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import { setSelectedGeometry } from '../../stores/blockType/blockTypeSlice';
import Dropdown from '@/client/common/components/lib/Dropdown/Dropdown';
import DropdownButton from '@/client/common/components/lib/Dropdown/DropdownButton';
import DropdownItem from '@/client/common/components/lib/Dropdown/DropdownItem';

const AddToolOptions = () => {
  const { blocks, selectedBlockName } = useAppSelector((state) => state.blockType);

  const dispatch = useAppDispatch();

  const handleGeometryChange = (val: string) => {
    dispatch(setSelectedGeometry(val));
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
    </Box>
  );
};

export default AddToolOptions;
