import * as React from 'react';
import { ReactNode } from 'react';

export type ButtonProps = {
  children: ReactNode;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  toggle: boolean;
  onToggle: (state: boolean) => void;
  tooltip?: string;
};

const ToggleButton = (props: ButtonProps) => {
  const { toggle, onClick, onToggle, tooltip } = props;

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
};

export default ToggleButton;
