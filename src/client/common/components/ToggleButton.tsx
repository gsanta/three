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

  return (
    // TODO: fix union type is too complex to represent error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <_Button {...(rest as any)} colorScheme={colorScheme} onClick={handleClick} ref={ref}>
      {props.children}
    </_Button>
  );
});

export default ToggleButton;