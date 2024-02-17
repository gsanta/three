import type { ComponentStyleConfig } from '@chakra-ui/react';

const CheckboxTheme: ComponentStyleConfig = {
  baseStyle: {
    control: {
      _checked: {
        backgroundColor: 'orange.400',
        borderColor: 'orange.400',
        _hover: {
          backgroundColor: 'orange.400',
          borderColor: 'orange.400',
        },
      },
    },
  },
  sizes: {
    md: {
      control: { w: 5, h: 5 },
    },
  },
};

export default CheckboxTheme;
