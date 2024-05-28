import Cable from './block/Cable';
import Device from './block/Device';
import Pole from './block/Pole';

export type BlockCategory = 'cables' | 'decorations' | 'devices' | 'poles' | 'roads' | 'walls' | 'building-bases';

export type BlockCategoryType =
  | Cable
  | Pole
  | Device
  | EmptyBlockCategory<'decorations'>
  | EmptyBlockCategory<'roads'>
  | EmptyBlockCategory<'walls'>
  | EmptyBlockCategory<'building-bases'>;

export type EmptyBlockCategory<T extends BlockCategory> = {
  category: T;
  id: string;
};

export type BlockCategories = {
  cables: Cable;
  decorations: EmptyBlockCategory<'decorations'>;
  poles: Pole;
  devices: Device;
  roads: EmptyBlockCategory<'roads'>;
  walls: EmptyBlockCategory<'walls'>;
  ['building-bases']: EmptyBlockCategory<'building-bases'>;
};

export type PartialBlockCategories = {
  [K in keyof BlockCategories]?: Partial<BlockCategories[K]>;
};

export type BlockCategoryRecords = {
  [K in keyof BlockCategories]: Record<string, BlockCategories[K]>;
};

export default BlockCategory;
