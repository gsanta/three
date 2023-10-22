import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
  FormControl,
  FormLabel,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { setEraserSize } from '../state/toolSlice';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

const EraseToolOptions = () => {
  const editor = useAppSelector((state) => state.editor.editor);
  const eraserSize = useAppSelector((state) => state.tool.eraserSize);

  const dispatch = useAppDispatch();

  const handleChangeEnd = (val: number) => {
    editor.setEraserSize(val);
    dispatch(setEraserSize(val));
  };

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      <FormControl>
        <FormLabel htmlFor="eraser-size-slider" display="flex" alignItems="center" gap="2" marginBottom="1">
          Size
          <Tooltip label="Size of the erase tool.">
            <QuestionOutlineIcon cursor="pointer" />
          </Tooltip>
        </FormLabel>
        <Slider
          aria-label="Eraser size slider"
          onChangeEnd={handleChangeEnd}
          min={1}
          max={5}
          defaultValue={eraserSize}
          maxW="100px"
          id="eraser-size-slider"
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

export default EraseToolOptions;
