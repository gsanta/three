import { ComponentStyleConfig } from '@chakra-ui/react';

const disabled = {
  bgColor: 'gray.600',
  cursor: 'not-allowed',
};

const ButtonTheme: ComponentStyleConfig = {
  baseStyle: {
    '.chakra-button__icon': {
      marginInlineEnd: 0,
    },
    padding: '2px',
    '&.iconOnly': {
      px: '1px',
      py: '1px',
      paddingY: '1px',
      paddingX: '2px',
    },
  },
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
