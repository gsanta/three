import Cable from '../services/scene/types/Cable';
import Pole from '../services/scene/types/Pole';

export type BlockCategories = {
  cables: Cable;
  decorations: Record<string, never>;
  poles: Pole;
  walls: Record<string, never>;
};

export type BlockCategoryRecords = {
  [K in keyof BlockCategories]: Record<string, BlockCategories[K]>;
};

type BlockCategory = keyof BlockCategories;

export default BlockCategory;
