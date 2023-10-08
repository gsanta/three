import { useAppSelector } from '@/hooks';
import { Box } from '@chakra-ui/react';
import React from 'react';
import SelectModeSwitch from './SelectModeSwitch';
import Editor from '@/features/editor/Editor';

const SelectToolOptions = () => {
  const editor = useAppSelector((state) => state.editor.editor);

  const handleSelectionModeChange = (val: string) => {
    editor.setSelectionMode(val as Parameters<Editor['setSelectionMode']>[0]);
  };

  return (
    <Box padding="4" display="flex" flexWrap="wrap" gap="4">
      <SelectModeSwitch onChange={handleSelectionModeChange} />
    </Box>
  );
};

export default SelectToolOptions;
