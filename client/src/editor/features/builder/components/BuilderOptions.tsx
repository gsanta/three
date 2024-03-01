import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import RadioSwitchButton from '../../../../common/components/RadioSwitchButton';
import RadioSwitchGroup from '../../../../common/components/RadioSwitchGroup';
import { setSelectedGeometry } from '../builderSlice';
import { BlockType } from '../types/Block';

const BuilderOptions = () => {
  const { blocks } = useAppSelector((state) => state.builder);
  const selectedBlockName = useAppSelector((state) => state.builder.selectedBlockName);

  const dispatch = useAppDispatch();

  const handleGeometryChange = (val: string) => {
    dispatch(setSelectedGeometry(val as BlockType));
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
    </Box>
  );
};

export default BuilderOptions;
