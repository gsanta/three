import { BlockDecorationType, BlockDecoratorName } from '../../models/block/BlockDecoration';
import ElectricConsumerDecorator from '../../models/block/categories/ElectricConsumerDecorator';
import ElectricsDecorator from '../../models/block/categories/ElectricsDecorator';
import ElectricSupplierDecorator from '../../models/block/categories/ElectricSupplierDecorator';

export type ElectricityDecoratorType = Extract<
  BlockDecorationType,
  ElectricConsumerDecorator | ElectricSupplierDecorator | ElectricsDecorator
>;

export type ElectricityDecoratorName = Extract<
  BlockDecoratorName,
  'electrics' | 'electric-suppliers' | 'electric-consumers'
>;

export type ElectricityDecoratorNameToType = {
  electrics: ElectricsDecorator;
  'electric-suppliers': ElectricSupplierDecorator;
  'electric-consumers': ElectricConsumerDecorator;
};

export const getElectricityDecorator = (type: BlockDecorationType): type is ElectricityDecoratorType => {
  return ['electrics', 'electric-suppliers', 'electric-consumers'].includes(type.decoration);
};

export const isElectricityDecorator = (
  name: BlockDecoratorName,
): name is 'electric-suppliers' | 'electric-consumers' => {
  return ['electric-suppliers', 'electric-consumers'].includes(name);
};
