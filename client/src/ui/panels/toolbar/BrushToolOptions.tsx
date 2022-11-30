import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

const BrushToolOptions = () => {
  return (
    <FormControl>
      <FormLabel>Size:</FormLabel>
      <Input size="xs" width="12" />
    </FormControl>
  );
};

export default BrushToolOptions;
