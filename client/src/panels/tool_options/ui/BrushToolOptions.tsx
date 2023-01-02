import useAppContext from '@/ui/hooks/useAppContext';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent } from 'react';

const BrushToolOptions = observer(() => {
  const { editorApi } = useAppContext();

  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    editorApi.setBrushSize(parseInt(e.target.value, 10));
  };

  return (
    <FormControl display="flex" flexDirection="row">
      <FormLabel size="xs">Size:</FormLabel>
      <Input size="xs" width="12" onChange={handleSizeChange} />
    </FormControl>
  );
});

export default BrushToolOptions;
