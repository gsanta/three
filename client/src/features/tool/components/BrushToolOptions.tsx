import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks';
import {
  Box,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { setBrushSize } from '../state/toolSlice';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

const BrushToolOptions = () => {
  const editor = useAppSelector((state) => state.editor.editor);
  const brushSize = useAppSelector((state) => state.tool.brushSize);

  const dispatch = useAppDispatch();

  const handleChangeEnd = (val: number) => {
    editor.setBrushSize(val);
    dispatch(setBrushSize(val));
  };

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      <FormControl>
        <FormLabel htmlFor="brush-size-slider" display="flex" alignItems="center" gap="2" marginBottom="1">
          Size
          <Tooltip label="Size of the brush tool.">
            <QuestionOutlineIcon cursor="pointer" />
          </Tooltip>
        </FormLabel>
        <Slider
          aria-label="Brush size slider"
          onChangeEnd={handleChangeEnd}
          min={1}
          max={5}
          defaultValue={brushSize}
          maxW="100px"
          id="brush-size-slider"
        >
          <SliderMark value={1}>1</SliderMark>
          <SliderMark value={3}>3</SliderMark>
          <SliderMark value={5}>5</SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
    </Box>
  );
};

export default BrushToolOptions;
