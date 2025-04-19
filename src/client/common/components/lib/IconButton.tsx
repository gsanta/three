import * as React from 'react';
import { MouseEventHandler } from 'react';
import Icon, { IconName } from './Icon';

export type IconButtonProps = {
  iconName: IconName;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  tooltip?: string;
};

const IconButton = ({ iconName, onClick, tooltip }: IconButtonProps) => {
  return tooltip ? (
    <div className="tooltip tooltip-right" data-tip={tooltip}>
      <button className="btn btn-square btn-neutral" onClick={onClick}>
        <Icon name={iconName} />
      </button>
    </div>
  ) : (
    <button className="btn btn-square btn-neutral" onClick={onClick}>
      <Icon name={iconName} />
    </button>
  );
};

export default IconButton;
