import { useAppSelector } from '@/hooks';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import SelectModeSwitch from './SelectModeSwitch';
import Editor from '@/features/editor/Editor';

const SelectToolOptions = () => {
  const editor = useAppSelector((state) => state.editor.editor);
  const [horizontalShear, setHorizontalShear] = useState('');
  const [verticalShear, setVerticalShear] = useState('');
  const [rotation, setRotation] = useState('');

  const handleApplyHorizontalShear = () => {
    editor.shearHorizontal((Number(horizontalShear) * Math.PI) / 180);
  };

  const handleApplyVerticalShear = () => {
    editor.shearVertical((Number(verticalShear) * Math.PI) / 180);
  };

  const handleApplyRotation = () => {
    editor.rotate((Number(rotation) * Math.PI) / 180);
  };

  const handleSelectionModeChange = (val: string) => {
    editor.setSelectionMode(val as Parameters<Editor['setSelectionMode']>[0]);
  };

  return (
    <Box padding="4" display="flex" flexWrap="wrap" gap="4">
      <SelectModeSwitch onChange={handleSelectionModeChange} />
      <FormControl width="40">
        <FormLabel htmlFor="eraser-size-slider" fontSize="sm">
          Shear horizontal (°)
        </FormLabel>
        <Box display="flex" gap="2">
          <Input
            type="number"
            min="0"
            max="100"
            size="sm"
            value={horizontalShear}
            onChange={(e) => setHorizontalShear(e.target.value)}
          />
          <Button size="sm" onClick={handleApplyHorizontalShear}>
            Apply
          </Button>
        </Box>
      </FormControl>
      <FormControl width="40">
        <FormLabel htmlFor="eraser-size-slider" fontSize="sm">
          Shear vertical (°)
        </FormLabel>
        <Box display="flex" gap="2">
          <Input
            type="number"
            min="0"
            max="100"
            size="sm"
            value={verticalShear}
            onChange={(e) => setVerticalShear(e.target.value)}
          />
          <Button size="sm" onClick={handleApplyVerticalShear}>
            Apply
          </Button>
        </Box>
      </FormControl>
      <FormControl width="40">
        <FormLabel htmlFor="eraser-size-slider" fontSize="sm">
          Rotate (°)
        </FormLabel>
        <Box display="flex" gap="2">
          <Input
            type="number"
            min="0"
            max="100"
            size="sm"
            value={rotation}
            onChange={(e) => setRotation(e.target.value)}
          />
          <Button size="sm" onClick={handleApplyRotation}>
            Apply
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default SelectToolOptions;
