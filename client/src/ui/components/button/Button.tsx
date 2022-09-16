import * as React from 'react';
import { Button as _Button, ButtonProps as _ButtonProps, forwardRef } from '@chakra-ui/react';
import Icon, { IconName } from '../icon/Icon';
import classNames from 'classnames';

export type ButtonProps = _ButtonProps & {
  level?: 'primary' | 'secondary';
  iconName?: IconName;
} & (
    | {
        variant?: 'default' | 'action' | 'success' | 'danger';
        toggle?: never;
        onToggle?: never;
      }
    | {
        variant?: never;
        toggle?: 'on' | 'off';
        onToggle?: (state: 'on' | 'off') => void;
      }
  );

const Button = forwardRef<ButtonProps, 'input'>((props, ref) => {
  const { children, iconName, toggle, variant: inputVariant, onClick, onToggle, ...rest } = props;
  const properties: Partial<_ButtonProps> = { ...rest };

  if (iconName) {
    properties.leftIcon = <Icon name={iconName} />;
  }

  let variant = inputVariant;

  const isToggle = toggle === 'on' || toggle === 'off';

  if (toggle === 'on') {
    variant = 'action';
  } else if (toggle === 'off') {
    variant = 'default';
  }

  const classes = classNames({
    iconOnly: iconName && !children,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isToggle) {
      onToggle?.(toggle === 'on' ? 'off' : 'on');
    }

    onClick?.(event);
  };

  return (
    <_Button
      children={children}
      className={classes}
      {...properties}
      onClick={handleClick}
      variant={`${props.level}-${variant}`}
      ref={ref}
    />
  );
});

Button.defaultProps = {
  variant: 'default',
  level: 'primary',
} as ButtonProps;

export default Button;
