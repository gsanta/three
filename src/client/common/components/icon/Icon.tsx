import React from 'react';
import * as icons from './Icons';
import Image from 'next/image';

export type IconName = keyof typeof icons;
export interface IconNameProps {
  name: IconName;
  src?: undefined;
}

export interface IconSrcProps {
  src: string;
  name?: undefined;
}

export type IconProps = IconNameProps | IconSrcProps;

const Icon = ({ name, src }: IconProps) => {
  if (src) {
    return <Image src={src} width={500} height={500} alt="Picture of the author" />;
  }

  if (name) {
    const IconComponent = icons[name];
    return <IconComponent size="24px" />;
  }

  return null;
};

export default Icon;
