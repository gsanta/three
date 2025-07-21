import { store } from '@/client/common/utils/store';
import { ElectricNodeUpdate, updateElectricSystem } from './electricitySlice';
import { BlockDecorationType, BlockDecoratorName } from '../../models/block/BlockDecoration';
import ElectricConsumerDecorator from '../../models/block/categories/ElectricConsumerDecorator';
import ElectricSupplierDecorator from '../../models/block/categories/ElectricSupplierDecorator';

export type ElectricityDecoratorType = Extract<BlockDecorationType, ElectricConsumerDecorator | ElectricSupplierDecorator>;

export const isElectricityDecoratorName = (type: BlockDecorationType): type is ElectricityDecoratorType => {
  return ['electric-supplier', 'electric-consumer'].includes(type.decoration);
};

class ElectricityStore {
  update(updates: ElectricNodeUpdate[]) {
    store.dispatch(updateElectricSystem(updates));
  }
}

export default ElectricityStore;
