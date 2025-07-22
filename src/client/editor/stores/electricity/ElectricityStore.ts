import { Store } from '@/client/common/utils/store';
import { BlockDecorationType, BlockDecoratorName } from '../../models/block/BlockDecoration';
import ElectricConsumerDecorator from '../../models/block/categories/ElectricConsumerDecorator';
import ElectricSupplierDecorator from '../../models/block/categories/ElectricSupplierDecorator';

export type ElectricityDecoratorType = Extract<
  BlockDecorationType,
  ElectricConsumerDecorator | ElectricSupplierDecorator
>;

export const getElectricityDecorator = (type: BlockDecorationType): type is ElectricityDecoratorType => {
  return ['electric-supplier', 'electric-consumer'].includes(type.decoration);
};

export const isElectricityDecorator = (name: BlockDecoratorName): name is 'electric-supplier' | 'electric-consumer' => {
  return ['electric-supplier', 'electric-consumer'].includes(name);
};

class ElectricityStore {
  constructor(store: Store) {
    this.store = store;
  }

  getRelations() {
    return this.getState().relations;
  }

  private getState() {
    return this.store.getState().electricity;
  }

  private store: Store;
}

export default ElectricityStore;
