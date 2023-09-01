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
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { setEraserSize } from '../state/toolSlice';

const labelStyles = {
  mt: '3',
  fontSize: 'sm',
};

const EraseToolOptions = () => {
  const editor = useAppSelector((state) => state.editor.editor);
  const eraserSize = useAppSelector((state) => state.tool.eraserSize);

  const dispatch = useAppDispatch();

  const handleChangeEnd = (val: number) => {
    editor.setEraserSize(val);
    dispatch(setEraserSize(val));
  };

  const handleShear = () => {
    editor.shearHorizontal();
  };

  return (
    <Box padding="4">
      <FormControl display="flex">
        <FormLabel htmlFor="eraser-size-slider">Size</FormLabel>
        <Slider
          aria-label="slider-ex-6"
          onChangeEnd={handleChangeEnd}
          min={1}
          max={5}
          defaultValue={eraserSize}
          maxW="100px"
          id="eraser-size-slider"
        >
          <SliderMark value={1} {...labelStyles}>
            1
          </SliderMark>
          <SliderMark value={3} {...labelStyles}>
            3
          </SliderMark>
          <SliderMark value={5} {...labelStyles}>
            5
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack bg="orange.600" />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Button onClick={handleShear}>Shear</Button>
      </FormControl>
    </Box>
  );
};

export default EraseToolOptions;
