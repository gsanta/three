import { store } from '@/client/common/utils/store';
import { ElectricNodeUpdate, updateElectricSystem } from './electricitySlice';
import { BlockDecoratorName } from '../../models/block/BlockDecoration';

export type ElectricityDecoratorName = Extract<BlockDecoratorName, 'electric-supplier'>;

export const isElectricityDecoratorName = (name: string): name is ElectricityDecoratorName => {
  return ['electric-supplier'].includes(name);
};

class ElectricityStore {
  update(updates: ElectricNodeUpdate[]) {
    store.dispatch(updateElectricSystem(updates));
  }
}

export default ElectricityStore;
