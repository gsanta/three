import Cable from '../features/block/types/Cable';
import Pole from '../features/block/types/Pole';

type BlockCategory = 'cables' | 'decorations' | 'poles' | 'walls';

export type EmptyBlockCategory<T extends BlockCategory> = {
  category: T;
  id: string;
};

export type BlockCategories = {
  cables: Cable;
  decorations: EmptyBlockCategory<'decorations'>;
  poles: Pole;
  walls: EmptyBlockCategory<'walls'>;
};

export type BlockCategoryRecords = {
  [K in keyof BlockCategories]: Record<string, BlockCategories[K]>;
};

export default BlockCategory;
