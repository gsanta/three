import { sliderAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  filledTrack: {
    bg: 'orange.600',
  },
  mark: {
    mt: '3',
    fontSize: 'sm',
  },
});

const sliderTheme = defineMultiStyleConfig({ baseStyle });

export default sliderTheme;
