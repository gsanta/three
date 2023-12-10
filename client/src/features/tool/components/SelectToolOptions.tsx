import { useAppSelector } from '@/common/hooks/hooks';
import { Box, FormControl, FormLabel, Tooltip } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import React from 'react';
import Editor from '@/features/editor/Editor';
import RadioSwitchGroup from '@/common/components/RadioSwitchGroup';
import RadioSwitchButton from '@/common/components/RadioSwitchButton';

const SelectToolOptions = () => {
  const editor = useAppSelector((state) => state.editor.editor);

  const handleSelectionModeChange = (val: string) => {
    editor.setSelectionMode(val as Parameters<Editor['setSelectionMode']>[0]);
  };

  const handleSelectionTypeChange = (val: string) => {
    editor.setSelectionType(val as Parameters<Editor['setSelectionType']>[0]);
  };

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      <FormControl>
        <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
          Manipulation mode
          <Tooltip label="First make a selection on the canvas, and then start to drag with the mouse above the selection. The selected tiles will be manipulated by this mode.">
            <QuestionOutlineIcon cursor="pointer" />
          </Tooltip>
        </FormLabel>
        <RadioSwitchGroup name="selection-manipulation-mode" defaultValue="move" onChange={handleSelectionModeChange}>
          <RadioSwitchButton value="move">move</RadioSwitchButton>
          <RadioSwitchButton value="rotate">rotate</RadioSwitchButton>
          <RadioSwitchButton value="shear">shear</RadioSwitchButton>
        </RadioSwitchGroup>
      </FormControl>
      <FormControl>
        <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
          Selection type
          <Tooltip label="First make a selection on the canvas, and then start to drag with the mouse above the selection. The selected tiles will be manipulated by this mode.">
            <QuestionOutlineIcon cursor="pointer" />
          </Tooltip>
        </FormLabel>
        <RadioSwitchGroup name="selection-type" defaultValue="rectangle" onChange={handleSelectionTypeChange}>
          <RadioSwitchButton value="rectangle">rectangle</RadioSwitchButton>
          <RadioSwitchButton value="wand">wand</RadioSwitchButton>
        </RadioSwitchGroup>
      </FormControl>
    </Box>
  );
};

export default SelectToolOptions;
