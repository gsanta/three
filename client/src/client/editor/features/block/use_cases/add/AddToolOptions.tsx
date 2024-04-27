import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/hooks';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import RadioSwitchButton from '../../../../../common/components/RadioSwitchButton';
import RadioSwitchGroup from '../../../../../common/components/RadioSwitchGroup';
import { setBlockRotation, setBlockSize, setSelectedGeometry } from '../../../template/templateSlice';
import { BlockName } from '../../../../types/BlockType';
import useBlock from '../../components/hooks/useBlock';
import RotationControl from '../../components/RotationControl';
import SizeControl from '../../components/SizeControl';

const AddToolOptions = () => {
  const { blocks, selectedBlockName } = useAppSelector((state) => state.template.present);
  const selectedBlock = useBlock(selectedBlockName);

  const { settings, selectedSettings } = useAppSelector((state) => state.template.present);
  const blockSettings = settings[selectedBlock.category];
  const selectedValues = selectedSettings[selectedBlock.category];

  const dispatch = useAppDispatch();

  const handleGeometryChange = (val: string) => {
    dispatch(setSelectedGeometry(val as BlockName));
  };

  const handleSizeChange = (size: number) => {
    dispatch(setBlockSize({ axis: 'x', size, blockName: selectedBlock.name }));
  };

  const handleRotationChange = (axis: 'x' | 'y' | 'z', rotation: number) => {
    dispatch(setBlockRotation({ axis, blockName: selectedBlock.name, rotation }));
  };

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      <FormControl>
        <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
          Geometry type
        </FormLabel>
        <RadioSwitchGroup defaultValue={selectedBlockName} name="geometry-selector" onChange={handleGeometryChange}>
          {blocks.map((block) => (
            <RadioSwitchButton key={block.name} value={block.name}>
              {block.name}
            </RadioSwitchButton>
          ))}
        </RadioSwitchGroup>
      </FormControl>
      <SizeControl axis="x" block={blockSettings} onChange={handleSizeChange} value={selectedValues.scale[0]} />
      <RotationControl
        axis="y"
        block={blockSettings}
        onChange={(val) => handleRotationChange('y', val)}
        value={selectedValues.rotation[1]}
      />
    </Box>
  );
};

export default AddToolOptions;
