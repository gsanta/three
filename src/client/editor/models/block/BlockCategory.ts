import Cable from './categories/Cable';
import Transformer from './categories/Transformer';
import Device from './categories/Device';

export type BlockDecoration = 'cables' | 'decorations' | 'devices' | 'roads' | 'walls' | 'building-bases';

export type BlockDecorationType = Cable | Device | Transformer | EmptyBlockCategory<'roads'>;

export type EmptyBlockCategory<T extends BlockDecoration> = {
  category: T;
  id: string;
};

export type BlockCategories = {
  cables: Cable;
  decorations: EmptyBlockCategory<'decorations'>;
  devices: Device;
  roads: EmptyBlockCategory<'roads'>;
  walls: EmptyBlockCategory<'walls'>;
  ['building-bases']: EmptyBlockCategory<'building-bases'>;
  transformers: Transformer;
};

export type PartialBlockCategories = {
  [K in keyof BlockCategories]?: Partial<BlockCategories[K]>;
};

export type BlockCategoryRecords = {
  [K in keyof BlockCategories]: Partial<Record<string, BlockCategories[K]>>;
};

export default BlockDecoration;
