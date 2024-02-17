import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({
  marginBottom: '0',
});

export const formLabelTheme = defineStyleConfig({
  baseStyle,
});
