import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Box } from '@chakra-ui/react';
import React, { useState } from 'react';

const labelStyles = {
  mt: '2',
  ml: '-2.5',
  fontSize: 'sm',
};

const EraseToolOptions = () => {
  const [, setSliderValue] = useState(50);

  return (
    <Box padding="4">
      <Slider
        aria-label="slider-ex-6"
        colorScheme="orange"
        onChange={(val) => setSliderValue(val)}
        min={1}
        max={5}
        defaultValue={3}
        maxW="100px"
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
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

export default EraseToolOptions;
