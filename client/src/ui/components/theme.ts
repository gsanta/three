import { extendTheme } from '@chakra-ui/react';
import Checkbox from './checkbox/Checkbox.theme';
import Select from './select/Select.theme';
import Button from './button/Button.theme';
import Tooltip from './tooltip/Tooltip.theme';
import Dialog from './dialog/Dialog.theme';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'gray.50',
      },
    },
  },
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
    Tooltip,
    Modal: Dialog,
  },
});

export default theme;
