import * as React from 'react';
import { Button as _Button, ButtonProps as _ButtonProps, forwardRef } from '@chakra-ui/react';

export type ButtonProps = _ButtonProps & {
  toggle: boolean;
  onToggle: (state: boolean) => void;
};

const ToggleButton = forwardRef<ButtonProps, 'input'>((props, ref) => {
  const { children, colorScheme = 'gray', toggle, onClick, onToggle, ...rest } = props;

  // if (toggle) {
  //   colorScheme = 'orange';
  // }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onToggle(toggle);
    onClick?.(event);
  };

  return (
    <_Button
      // TODO: fix union type is too complex to represent error
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(rest as any)}
      colorScheme={colorScheme}
      onClick={handleClick}
      ref={ref}
      width="2.5rem"
      height="2.5rem"
    >
      {props.children}
    </_Button>
  );
});

export default ToggleButton;
