import { store } from '@/client/common/utils/store';
import { ElectricNodeUpdate, updateElectricSystem } from './electricitySlice';

class ElectricityStore {
  update(updates: ElectricNodeUpdate[]) {
    store.dispatch(updateElectricSystem(updates));
  }
}

export default ElectricityStore;
