import { ComponentStyleConfig } from '@chakra-ui/react';

const SelectTheme: ComponentStyleConfig = {
  baseStyle: {
    field: {
      borderWidth: 1,
      ':focus': {
        borderColor: 'orange.400',
      },
    },
  },
  defaultProps: {
    variant: null,
  },
};

export default SelectTheme;
