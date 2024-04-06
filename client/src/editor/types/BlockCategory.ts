import Pole from '../services/scene/types/Pole';

export type BlockCategories = {
  poles: Pole;
  walls: Record<string, never>;
};

export type BlockCategoryRecords = {
  [K in keyof BlockCategories]: Record<string, BlockCategories[K]>;
};

export type BlockCategory = keyof BlockCategories;
