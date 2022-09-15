import React from 'react';
import * as icons from './Icons';

export type IconName = keyof typeof icons;
export interface IconProps {
  name: IconName;
}

const Icon = ({ name }: IconProps) => {
  const TheIcon = icons[name];
  return <TheIcon size="24px" />;
};

export default Icon;
