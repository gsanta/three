import { formAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  container: {
    display: 'flex',
  },
});

const FormControlTheme = defineMultiStyleConfig({
  baseStyle,
});

export default FormControlTheme;
