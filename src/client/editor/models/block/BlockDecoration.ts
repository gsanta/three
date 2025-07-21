import CableDecorator from './categories/CableDecorator';
import TransformerDecorator from './categories/TransformerDecorator';
import { BlockCategoryName } from './BlockCategoryName';
import PoleDecorator from './categories/PoleDecorator';
import PlayerDecorator from './categories/PlayerDecorator';
import ElectricConsumerDecorator from './categories/ElectricConsumerDecorator';
import ElectricSupplierDecorator from './categories/ElectricSupplierDecorator';

export type BlockDecoratorName =
  | 'cables'
  | 'electric-supplier'
  | 'electric-consumer'
  | 'players'
  | 'transformers'
  | 'poles';

export type BlockDecorationType = CableDecorator | ElectricConsumerDecorator | ElectricSupplierDecorator | TransformerDecorator | PlayerDecorator | PoleDecorator;

export type EmptyBlockCategory<T extends BlockCategoryName> = {
  category: T;
  id: string;
};

export type BlockDecorations = {
  cables: CableDecorator;
  transformers: TransformerDecorator;
  players: PlayerDecorator;
  poles: PoleDecorator;
};

export type PartialBlockDecorations = {
  [K in keyof BlockDecorations]?: Partial<BlockDecorationType>;
};

export type BlockCategoryRecords = {
  cables: Partial<Record<string, CableDecorator>>;
  transformers: Partial<Record<string, TransformerDecorator>>;
  players: Partial<Record<string, PlayerDecorator>>;
  poles: Partial<Record<string, PoleDecorator>>;
};
