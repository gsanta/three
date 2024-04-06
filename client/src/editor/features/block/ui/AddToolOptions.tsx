import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import RadioSwitchButton from '../../../../common/components/RadioSwitchButton';
import RadioSwitchGroup from '../../../../common/components/RadioSwitchGroup';
import { setBlockRotation, setBlockSize, setSelectedGeometry } from '../addBlockSlice';
import { BlockType } from '../../../types/BlockData';
import useBlock from './hooks/useBlock';
import RotationControl from './RotationControl';
import SizeControl from './SizeControl';

const AddToolOptions = () => {
  const { blocks, selectedBlockName } = useAppSelector((state) => state.addBlock.present);
  const selectedBlock = useBlock(selectedBlockName);
  const options = selectedBlock.options;

  const dispatch = useAppDispatch();

  const handleGeometryChange = (val: string) => {
    dispatch(setSelectedGeometry(val as BlockType));
  };

  const handleSizeChange = (size: number) => {
    dispatch(setBlockSize({ size, blockName: selectedBlock.data.name }));
  };

  const handleRotationChange = (axis: 'x' | 'y' | 'z', rotation: number) => {
    dispatch(setBlockRotation({ axis, blockName: selectedBlock.data.name, rotation }));
  };

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      <FormControl>
        <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
          Geometry type
        </FormLabel>
        <RadioSwitchGroup defaultValue={selectedBlockName} name="geometry-selector" onChange={handleGeometryChange}>
          {blocks.map((block) => (
            <RadioSwitchButton key={block.data.name} value={block.data.name}>
              {block.data.name}
            </RadioSwitchButton>
          ))}
        </RadioSwitchGroup>
      </FormControl>
      <SizeControl block={selectedBlock} onChange={handleSizeChange} value={options.size.selected} />
      <RotationControl
        axis="y"
        block={selectedBlock}
        onChange={(val) => handleRotationChange('y', val)}
        value={selectedBlock.selected.rotation[1]}
      />
    </Box>
  );
};

export default AddToolOptions;
