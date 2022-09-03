import { extendTheme } from '@chakra-ui/react';
import Checkbox from './checkbox/Checkbox.theme';
import Select from './select/Select.theme';
import Button from './button/Button.theme';

const theme = extendTheme({
  config: {
    cssVarPrefix: '',
  },
  colors: {
    brand: {
      100: 'red',
      900: '#1a202c',
    },
  },
  components: {
    Checkbox,
    Select,
    Button,
  },
});

export default theme;