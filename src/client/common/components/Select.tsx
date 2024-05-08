import * as React from 'react';
import { forwardRef, Select as _Select, SelectProps as _SelectProps } from '@chakra-ui/react';

export type SelectProps = _SelectProps;

const Select = forwardRef<SelectProps, 'select'>((props, ref) => {
  const { placeholder, children, ...rest } = props;

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <_Select ref={ref} {...(rest as any)}>
      {placeholder && (
        <option hidden disabled value="">
          {placeholder}
        </option>
      )}
      {children}
    </_Select>
  );
});

Select.defaultProps = {
  size: 'medium',
} as SelectProps;

export default Select;
