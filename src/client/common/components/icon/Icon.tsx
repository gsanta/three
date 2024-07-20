import React from 'react';
import * as icons from './Icons';
import Image from 'next/image';

export type IconName = keyof typeof icons;
export interface IconProps {
  name?: IconName;
  src?: string;
}

const Icon = ({ name, src }: IconProps) => {
  if (src) {
    return <Image src={src} width={500} height={500} alt="Picture of the author" />;
  }

  const IconComponent = icons[name];
  return <IconComponent size="24px" />;
};

export default Icon;
