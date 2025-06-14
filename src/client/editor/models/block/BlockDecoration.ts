import CableDecorator from './categories/CableDecorator';
import TransformerDecorator from './categories/TransformerDecorator';
import { BlockCategoryName } from './BlockCategoryName';
import PoleDecorator from './categories/PoleDecorator';

export type BlockDecoratorName = 'cables' | 'transformers' | 'poles';

export type BlockDecorationType = CableDecorator | TransformerDecorator | PoleDecorator;

export type EmptyBlockCategory<T extends BlockCategoryName> = {
  category: T;
  id: string;
};

export type BlockDecorations = {
  cables: CableDecorator;
  transformers: TransformerDecorator;
  poles: PoleDecorator;
  // devices: Device;
  // houses: EmptyBlockCategory<'houses'>;
  // humans: EmptyBlockCategory<'humans'>;
  // poles: EmptyBlockCategory<'poles'>;
  // roads: EmptyBlockCategory<'roads'>;
  // transformers: Transformer;
  // 'weather-heads': EmptyBlockCategory<'weather-heads'>;
};

export type PartialBlockDecorations = {
  [K in keyof BlockDecorations]?: Partial<BlockDecorationType>;
};

export type BlockCategoryRecords = {
  [K in keyof BlockDecorations]: Partial<Record<string, BlockDecorationType>>;
};
