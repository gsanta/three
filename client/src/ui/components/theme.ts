import { extendTheme } from '@chakra-ui/react';
import Checkbox from './checkbox/Checkbox.theme';
import Select from './select/Select.theme';
import Button from './button/Button.theme';
import Tooltip from './tooltip/Tooltip.theme';
import Dialog from './dialog/Dialog.theme';
import IconButton from './themes/IconButton.theme';
import MenuTheme from './themes/Menu.theme';
import FrameButtonTheme from './button/FrameButton.theme';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
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
  cssVarPrefix: '',
  colors: {
    // brand: {
    //   100: 'red',
    //   300: '#CBD5E0',
    //   700: '#A0AEC0',
    //   800: '#718096',
    //   900: '#1a202c',
    //   foreground: '#F7FAFC',
    //   background: '#1A202C',
    //   primary: '#ED8936',
    // },
  },
  components: {
    Checkbox,
    Select,
    Button,
    IconButton,
    Tooltip,
    Menu: MenuTheme,
    Modal: Dialog,
    FrameButton: FrameButtonTheme,
    // Input: inputTheme,
    // Form: FormControl,
    // FormLabel: formLabelTheme,
  },
});

export default theme;
