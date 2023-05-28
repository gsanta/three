import { menuAnatomy as parts } from '@chakra-ui/anatomy';
import { theme } from '@chakra-ui/react';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';
const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = defineStyle((props) => {
  const { colorScheme: c = 'whiteAlpha' } = props;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  const style = theme.components.Menu.baseStyle?.(props)!;
  style.item._active.bg = `${c}.400`;
  style.item._focus.bg = `${c}.400`;
  return style;
});

const MenuTheme = defineMultiStyleConfig({
  baseStyle,
});

export default MenuTheme;
