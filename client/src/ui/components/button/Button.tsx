import * as React from 'react';
import { Button as _Button, ButtonProps as _ButtonProps, forwardRef } from '@chakra-ui/react';

export type ButtonProps = _ButtonProps & {
  variant?: 'default' | 'action' | 'success' | 'danger';
  level?: 'primary' | 'secondary';
};

const Button = forwardRef<ButtonProps, 'input'>((props, ref) => {
  return <_Button {...props} variant={`${props.level}-${props.variant}`} ref={ref} />;
});

Button.defaultProps = {
  variant: 'default',
  level: 'primary',
} as ButtonProps;

export default Button;
