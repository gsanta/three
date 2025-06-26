import * as React from 'react';
import { MouseEventHandler } from 'react';
import Icon, { IconName } from './Icon';

export type IconButtonProps = {
  iconName: IconName;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  tooltip?: string;
  variant?: 'ghost';
};

const IconButton = ({ iconName, isDisabled, onClick, tooltip, variant }: IconButtonProps) => {
  const disabledClass = isDisabled ? 'btn-disabled' : '';

  return tooltip ? (
    <div className="tooltip tooltip-right" data-tip={tooltip}>
      <button
        className={`btn btn-square btn-neutral ${disabledClass} ${variant === 'ghost' ? 'btn-ghost' : ''}`}
        onClick={onClick}
      >
        <Icon name={iconName} />
      </button>
    </div>
  ) : (
    <button
      className={`btn btn-square btn-neutral ${disabledClass} ${variant === 'ghost' ? 'btn-ghost' : ''}`}
      onClick={onClick}
    >
      <Icon name={iconName} />
    </button>
  );
};

export default IconButton;
