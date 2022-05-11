import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    FormLabel: {
      baseStyle: {
        fontSize: 'xs',
        mb: 1,
        lineHeight: 'var(--chakra-lineHeights-3)',
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            height: 5,
          },
        },
      },
    },
  },
});

export default theme;
