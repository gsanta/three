import { ComponentStyleConfig, defineStyle, theme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// const disabled = {
//   bgColor: 'gray.600',
//   cursor: 'not-allowed',
// };

const variantOutline = defineStyle((props) => {
  const { colorScheme } = props;

  const getBackgroundColor = () => {
    if (colorScheme === 'orange') {
      return mode(`${colorScheme}.200`, `${colorScheme}.500`)(props);
    } else {
      return mode(`${colorScheme}.200`, `whiteAlpha.200`)(props);
    }
  };

  const getBorderColor = () => {
    if (colorScheme === 'gray') {
      return mode(`gray.200`, `whiteAlpha.400`)(props);
    } else {
      return mode(`gray.200`, `${colorScheme}.400`)(props);
    }
  };

  const getHoverBackgroundColor = () => {
    if (colorScheme === 'gray') {
      return mode(`${colorScheme}.200`, `whiteAlpha.300`)(props);
    } else {
      return mode(`${colorScheme}.50`, `${colorScheme}.400`)(props);
    }
  };

  const getActiveBackgroundColor = () => {
    if (colorScheme === 'gray') {
      return mode(`${colorScheme}.200`, `whiteAlpha.400`)(props);
    } else {
      return mode(`${colorScheme}.100`, `${colorScheme}.300`)(props);
    }
  };

  const defaultTheme = theme.components.Button.variants?.outline(props);

  return {
    ...defaultTheme,
    bg: getBackgroundColor(),
    color: 'white',
    border: '1px solid',
    borderColor: getBorderColor(),
    _hover: {
      bg: getHoverBackgroundColor(),
    },
    _active: {
      bg: getActiveBackgroundColor(),
    },
  };
});

const variantSolid = defineStyle((props) => {
  const { colorScheme: c } = props;
  const defaultTheme = theme.components.Button.variants?.solid(props);
  const bg = mode(`${c}.200`, `${c}.600`)(props);

  return {
    ...defaultTheme,
    bg,
    color: 'white',
    _hover: {
      bg: mode(`${c}.50`, `${c}.500`)(props),
      _disabled: {
        bg,
      },
    },
    _active: {
      bg: mode(`${c}.100`, `${c}.500`)(props),
    },
  };
});

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
    _active: {
      bg: 'gray.400',
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
  },
  variants: {
    outline: variantOutline,
    solid: variantSolid,
  },
};

export default ButtonTheme;
