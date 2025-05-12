import Cable from './categories/Cable';
import Transformer from './categories/Transformer';
import Device from './categories/Device';
import { BlockCategoryName } from './BlockCategoryName';

export type BlockDecorationType = Cable | Device | Transformer | EmptyBlockCategory<BlockCategoryName>;

export type EmptyBlockCategory<T extends BlockCategoryName> = {
  category: T;
  id: string;
};

export type BlockCategories = {
  cables: Cable;
  devices: Device;
  houses: EmptyBlockCategory<'houses'>;
  humans: EmptyBlockCategory<'humans'>;
  poles: EmptyBlockCategory<'poles'>;
  roads: EmptyBlockCategory<'roads'>;
  transformers: Transformer;
  'weather-heads': EmptyBlockCategory<'weather-heads'>;
};

export type PartialBlockCategories = {
  [K in keyof BlockCategories]?: Partial<BlockDecorationType>;
};

export type BlockCategoryRecords = {
  [K in keyof BlockCategories]: Partial<Record<string, BlockDecorationType>>;
};
