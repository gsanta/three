import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
  tabpanel: {
    padding: 0,
  },
});

const tabsTheme = defineMultiStyleConfig({ baseStyle });

export default tabsTheme;
