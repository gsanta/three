import * as BiIcons from 'react-icons/bi'; // You can import other packs too
import * as CiIcons from 'react-icons/ci'; // You can import other packs too
import { ComponentType } from 'react';

export type IconName = keyof typeof BiIcons | keyof typeof CiIcons;

const iconPacks: Record<IconName, ComponentType<{ size?: number; color?: string }>> = {
  ...BiIcons,
  ...CiIcons,
  // Add more packs as needed
};

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

const Icon = ({ name, size = 24, color = 'currentColor' }: IconProps) => {
  const IconComponent = iconPacks[name] as ComponentType<{ size?: number; color?: string }>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  return <IconComponent size={size} color={color} />;
};

export default Icon;
