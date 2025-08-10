import CableDecorator from './categories/CableDecorator';
import TransformerDecorator from './categories/TransformerDecorator';
import { BlockCategoryName } from './BlockCategoryName';
import PoleDecorator from './categories/PoleDecorator';
import PlayerDecorator from './categories/PlayerDecorator';
import ElectricConsumerDecorator from './categories/ElectricConsumerDecorator';
import ElectricSupplierDecorator from './categories/ElectricSupplierDecorator';
import { ElectricityDecoratorNameToType } from '../../stores/electricity/Electrics.types';

export type CoreDecoratorName = 'cables' | 'players' | 'transformers' | 'poles';

export const coreDecorators: CoreDecoratorName[] = ['cables', 'players', 'transformers', 'poles'] as const;

export type BlockDecoratorName = 'electrics' | 'electric-suppliers' | 'electric-consumers' | CoreDecoratorName;

export type BlockDecoratorType =
  | CableDecorator
  | ElectricConsumerDecorator
  | ElectricSupplierDecorator
  | TransformerDecorator
  | PlayerDecorator
  | PoleDecorator;

export type EmptyBlockCategory<T extends BlockCategoryName> = {
  category: T;
  id: string;
};

export type CoreDecorations = {
  cables: CableDecorator;
  transformers: TransformerDecorator;
  players: PlayerDecorator;
  poles: PoleDecorator;
};

export type PartialBlockDecorations = {
  [K in keyof CoreDecorations]?: Partial<BlockDecoratorType>;
};

export type BlockCategoryRecords = {
  cables: Partial<Record<string, CableDecorator>>;
  transformers: Partial<Record<string, TransformerDecorator>>;
  players: Partial<Record<string, PlayerDecorator>>;
  poles: Partial<Record<string, PoleDecorator>>;
};

export type BlockDecorators = CoreDecorations & ElectricityDecoratorNameToType;

export const isCoreDecorator = (name: BlockDecoratorName): name is CoreDecoratorName => {
  return coreDecorators.includes(name as CoreDecoratorName);
};
