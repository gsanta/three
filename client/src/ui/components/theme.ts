import { extendTheme } from '@chakra-ui/react';
import Checkbox from './checkbox/Checkbox.theme';
import Select from './select/Select.theme';
import Button from './button/Button.theme';
import Tooltip from './tooltip/Tooltip.theme';
import Dialog from './dialog/Dialog.theme';
import FormControl from './themes/FormControl.theme';
import { inputTheme } from './themes/Input.theme';
import { formLabelTheme } from './themes/FormLabel.theme';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'gray.50',
      },
      '*:focus-visible': {
        boxShadow: 'outline',
        outline: 'none',
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
      foreground: '#F7FAFC',
      background: '#1A202C',
      primary: '#ED8936',
    },
  },
  components: {
    Checkbox,
    Select,
    Button,
    Tooltip,
    Modal: Dialog,
    Input: inputTheme,
    Form: FormControl,
    FormLabel: formLabelTheme,
  },
});

export default theme;
