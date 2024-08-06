import * as React from 'react';
import { Button as _Button, ButtonProps as _ButtonProps, forwardRef } from '@chakra-ui/react';
import Icon from './icon/Icon';

export type ButtonProps = _ButtonProps & {
  src: string;
};

const IconButton = forwardRef<ButtonProps, 'input'>((props, ref) => {
  const { children, colorScheme = 'gray', src, onClick, onToggle, ...rest } = props;

  // if (toggle) {
  //   colorScheme = 'orange';
  // }

  return (
    <_Button
      // TODO: fix union type is too complex to represent error
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(rest as any)}
      colorScheme={colorScheme}
      className="iconOnly"
      onClick={onClick}
      ref={ref}
      width="2.5rem"
      height="2.5rem"
    >
      <Icon src={src} />
    </_Button>
  );
});

export default IconButton;
