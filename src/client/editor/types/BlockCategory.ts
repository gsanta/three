import Cable from './block/Cable';
import Pole from './block/Pole';

type BlockCategory = 'cables' | 'decorations' | 'poles' | 'walls' | 'building-bases';

export type EmptyBlockCategory<T extends BlockCategory> = {
  category: T;
  id: string;
};

export type BlockCategories = {
  cables: Cable;
  decorations: EmptyBlockCategory<'decorations'>;
  poles: Pole;
  walls: EmptyBlockCategory<'walls'>;
  ['building-bases']: EmptyBlockCategory<'building-bases'>;
};

export type BlockCategoryRecords = {
  [K in keyof BlockCategories]: Record<string, BlockCategories[K]>;
};

export default BlockCategory;
