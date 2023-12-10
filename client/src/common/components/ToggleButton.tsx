import * as React from 'react';
import { Button as _Button, ButtonProps as _ButtonProps, forwardRef } from '@chakra-ui/react';

export type ButtonProps = _ButtonProps & {
  toggle: boolean;
  onToggle: (state: boolean) => void;
};

const ToggleButton = forwardRef<ButtonProps, 'input'>((props, ref) => {
  const { children, toggle, onClick, onToggle, ...rest } = props;

  let colorScheme: _ButtonProps['colorScheme'] = 'gray';

  if (toggle) {
    colorScheme = 'orange';
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onToggle(toggle);
    onClick?.(event);
  };

  return <_Button children={children} colorScheme={colorScheme} {...rest} onClick={handleClick} ref={ref} />;
});

export default ToggleButton;
