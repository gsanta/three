import * as React from 'react';
import { Checkbox as _CheckBox, CheckboxProps as _CheckboxProps, forwardRef } from '@chakra-ui/react';

const Checkbox = forwardRef<_CheckboxProps, 'input'>((props, ref) => {
  return <_CheckBox alignItems="flex-start" {...props} ref={ref} />;
});

export default Checkbox;
