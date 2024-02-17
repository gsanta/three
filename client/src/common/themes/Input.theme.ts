import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const OutlineVariant = definePartsStyle(() => {
  return {
    field: {
      border: '1px solid',
      borderColor: 'inherit',
      bg: 'gray.600',
      borderRadius: 'sm',
      _focusVisible: {
        zIndex: 1,
        borderColor: 'orange.400',
        boxShadow: `0 0 0 1px var(--chakra-colors-orange-600)`,
      },
    },
  };
});

const variants = {
  outline: OutlineVariant,
};

export const inputTheme = defineMultiStyleConfig({
  variants,
});
