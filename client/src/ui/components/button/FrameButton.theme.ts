import { defineStyle } from '@chakra-ui/styled-system';
import { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode } from '@chakra-ui/theme-tools';

const baseStyle = defineStyle((props) => {
  const { colorScheme: c } = props;
  const bg = mode(`${c}.200`, `${c}.600`)(props);

  return {
    bg,
    h: '10',
    w: '10',
    padding: '2px',
    _active: {
      bg: 'gray.400',
    },
    _hover: {
      bg: mode(`${c}.50`, `${c}.500`)(props),
      _disabled: {
        bg,
      },
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
  };
});

const sizes = {
  md: defineStyle({
    h: '5',
    w: '5',
    padding: '2px',
  }),
};

const FrameButtonTheme: ComponentStyleConfig = {
  baseStyle,
  sizes,
};

export default FrameButtonTheme;
