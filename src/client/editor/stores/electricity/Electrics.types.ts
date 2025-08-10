import { BlockDecoratorType, BlockDecoratorName } from '../../models/block/BlockDecoration';
import ElectricConsumerDecorator from '../../models/block/categories/ElectricConsumerDecorator';
import ElectricsDecorator from '../../models/block/categories/ElectricsDecorator';
import ElectricSupplierDecorator from '../../models/block/categories/ElectricSupplierDecorator';

export type ElectricityDecoratorType = Extract<
  BlockDecoratorType,
  ElectricConsumerDecorator | ElectricSupplierDecorator | ElectricsDecorator
>;

export type ElectricsDecoratorName = Extract<
  BlockDecoratorName,
  'electrics' | 'electric-suppliers' | 'electric-consumers'
>;

export const electricsDecoratorName: ElectricsDecoratorName[] = [
  'electrics',
  'electric-suppliers',
  'electric-consumers',
] as const;

export type ElectricityDecoratorNameToType = {
  electrics: ElectricsDecorator;
  'electric-suppliers': ElectricSupplierDecorator;
  'electric-consumers': ElectricConsumerDecorator;
};

export const getElectricityDecorator = (type: BlockDecoratorType): type is ElectricityDecoratorType => {
  return ['electrics', 'electric-suppliers', 'electric-consumers'].includes(type.decoration);
};

export const isElectricityDecorator = (name: BlockDecoratorName): name is ElectricsDecoratorName => {
  return electricsDecoratorName.includes(name as ElectricsDecoratorName);
};
