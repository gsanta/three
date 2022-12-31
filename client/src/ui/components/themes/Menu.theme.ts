import { menuAnatomy as parts } from '@chakra-ui/anatomy';
import { theme } from '@chakra-ui/react';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';
const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = defineStyle((props) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  const style = theme.components.Menu.baseStyle?.(props)!;
  style.list.bg = 'brand.background';
  style.item._active.bg = 'gray.400';
  style.item._focus.bg = 'gray.400';
  return style;
});

const MenuTheme = defineMultiStyleConfig({
  baseStyle,
});

export default MenuTheme;
