import { extendTheme } from '@chakra-ui/react';
import Checkbox from './Checkbox.theme';
import Select from './Select.theme';
import Button from './Button.theme';
import Tooltip from '../components/Tooltip.theme';
import Dialog from './Dialog.theme';
import IconButton from './IconButton.theme';
import MenuTheme from './Menu.theme';
import Alert from './Alert.theme';
import Switch from './Switch.theme';
import Tabs from './Tabs.theme';
import Slider from './Slider.theme';
import FrameButtonTheme from './FrameButton.theme';
import { formLabelTheme } from './FormLabel.theme';
import { inputTheme } from './Input.theme';

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
    Switch,
    Button,
    IconButton,
    Tooltip,
    Menu: MenuTheme,
    Modal: Dialog,
    FrameButton: FrameButtonTheme,
    FormLabel: formLabelTheme,
    Input: inputTheme,
    Alert: Alert,
    Tabs: Tabs,
    Slider: Slider,
    // Form: FormControl,
    // FormLabel: formLabelTheme,
  },
});

export default theme;
