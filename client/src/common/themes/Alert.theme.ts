import { alertAnatomy as parts } from '@chakra-ui/anatomy';
import { theme } from '@chakra-ui/react';
import { createMultiStyleConfigHelpers, cssVar } from '@chakra-ui/styled-system';
import { transparentize } from '@chakra-ui/theme-tools';

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const variantLeftAccent = definePartsStyle((props) => {
  const base = theme.components.Alert.variants?.['left-accent'](props);
  const $bg = cssVar('alert-bg');
  const $fg = cssVar('alert-fg');
  const { colorScheme: c } = props;

  function getBg() {
    const darkBg = transparentize(`${c}.300`, 0.5)(props.theme);
    return {
      light: `colors.${c}.100`,
      dark: darkBg,
    };
  }

  return {
    ...base,
    container: {
      ...base?.container,
      _dark: {
        ...base?.container._dark,
        [$fg.variable]: `colors.${c}.300`,
        [$bg.variable]: getBg().dark,
      },
    },
  };
});

const alertTheme = defineMultiStyleConfig({
  baseStyle: theme.components.Alert.baseStyle,
  variants: {
    ...theme.components.Alert.variants,
    'left-accent': variantLeftAccent,
  },
  defaultProps: {
    variant: 'left-accent',
    colorScheme: 'blue',
  },
});

export default alertTheme;
