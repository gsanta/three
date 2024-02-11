import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import React from 'react';
import RadioSwitchButton from '@/common/components/RadioSwitchButton';
import RadioSwitchGroup from '@/common/components/RadioSwitchGroup';
import { BasicGeometryName, setSelectedGeometry } from '@/features/builder/builderSlice';

const BuilderOptions = () => {
  const geometries = useAppSelector((state) => state.builder.geometries);
  const selectedGeometry = useAppSelector((state) => state.builder.selectedGeometry);
  // const brushSize = useAppSelector((state) => state.tool.brushSize);

  const dispatch = useAppDispatch();

  const handleGeometryChange = (val: string) => {
    dispatch(setSelectedGeometry(val as BasicGeometryName));
  };

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      <FormControl>
        <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
          Geometry type
        </FormLabel>
        <RadioSwitchGroup defaultValue={selectedGeometry} name="geometry-selector" onChange={handleGeometryChange}>
          {geometries.map((geometry) => (
            <RadioSwitchButton value={geometry.name}>{geometry.name}</RadioSwitchButton>
          ))}
        </RadioSwitchGroup>
      </FormControl>
    </Box>
  );
};

export default BuilderOptions;
