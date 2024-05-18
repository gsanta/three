import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import RadioSwitchButton from '../../../common/components/RadioSwitchButton';
import RadioSwitchGroup from '../../../common/components/RadioSwitchGroup';
import { setBlockRotation, setSelectedGeometry } from '../../stores/template/templateSlice';
import { BlockName } from '../../types/BlockType';
import useBlock from '../hooks/useBlock';
import RotationControl from './RotationControl';

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
