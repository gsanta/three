import React from 'react';
import * as icons from './Icons';

export type IconName = keyof typeof icons;
export interface IconProps {
  name: IconName;
}

const Icon = ({ name }: IconProps) => {
  const IconComponent = icons[name];
  return <IconComponent size="24px" />;
};

export default Icon;
