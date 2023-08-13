import { useAppSelector } from '@/hooks';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';

const BrushToolOptions = () => {
  const editor = useAppSelector((state) => state.tool.editor);

  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: create action instead of direct call
    editor?.setBrushSize(parseInt(e.target.value, 10));
  };

  return (
    <FormControl display="flex" flexDirection="row" marginTop="4">
      <FormLabel size="xs">Size:</FormLabel>
      <Input size="xs" width="12" onChange={handleSizeChange} />
    </FormControl>
  );
};

export default BrushToolOptions;
