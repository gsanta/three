import { ComponentStyleConfig } from '@chakra-ui/react';

const disabled = {
  bgColor: 'gray.600',
  cursor: 'not-allowed',
};

const ButtonTheme: ComponentStyleConfig = {
  baseStyle: {},
  variants: {
    'primary-action': {
      bgColor: 'orange.500',
      color: 'gray.50',
      fontWeight: 'bold',
      _hover: {
        bgColor: 'orange.400',
        _disabled: {
          ...disabled,
        },
      },
      _disabled: disabled,
    },
    'primary-default': {
      bgColor: 'gray.500',
      color: 'gray.50',
      fontWeight: 'bold',
      _hover: {
        bgColor: 'gray.400',
        _disabled: {
          ...disabled,
        },
      },
      _disabled: disabled,
    },
  },
};

export default ButtonTheme;