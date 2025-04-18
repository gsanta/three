import * as React from 'react';
import { ButtonProps as _ButtonProps, forwardRef } from '@chakra-ui/react';

export type ButtonProps = _ButtonProps & {
  toggle: boolean;
  onToggle: (state: boolean) => void;
  tooltip?: string;
};

const ToggleButton = forwardRef<ButtonProps, 'input'>((props, ref) => {
  const { children, colorScheme = 'gray', toggle, onClick, onToggle, tooltip, ...rest } = props;

  // if (toggle) {
  //   colorScheme = 'orange';
  // }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onToggle(toggle);
    onClick?.(event);
  };

  return tooltip ? (
    <div className="tooltip tooltip-right" data-tip={tooltip}>
      <button className={`btn btn-square ${toggle ? 'btn-warning' : 'btn-neutral'}`} onClick={handleClick}>
        {props.children}
      </button>
    </div>
  ) : (
    <button className="btn btn-square btn-neutral" onClick={handleClick}>
      {props.children}
    </button>
  );
  // <_Button

  //   // TODO: fix union type is too complex to represent error
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   {...(rest as any)}
  //   colorScheme={colorScheme}
  //   onClick={handleClick}
  //   ref={ref}
  //   width="2.5rem"
  //   height="2.5rem"
  // >
  //   {props.children}
  // </_Button>
});

export default ToggleButton;
