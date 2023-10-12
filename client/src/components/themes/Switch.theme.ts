import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  thumb: {
    bg: 'gray.800',
    _checked: {
      bg: 'gray.100',
    },
  },
  track: {
    borderRadius: 'sm',
    p: 1,
    bg: 'gray.100',
    _checked: {
      bg: 'orange.500',
    },
  },
});

const switchTheme = defineMultiStyleConfig({ baseStyle });

export default switchTheme;
