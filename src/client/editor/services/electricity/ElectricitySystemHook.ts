import BlockStore from '../../stores/block/BlockStore';
import { UpdateBlocks } from '../../stores/block/blockSlice';
import ElectricityStore from '../../stores/electricity/ElectricityStore';
import SystemHook from '../update/SystemHook';
import UpdateElectricSystem from './UpdateElectricSystem';

class ElectricitySystemHook extends SystemHook {
  constructor(blockStore: BlockStore, electricityStore: ElectricityStore) {
    super();

    this.updateElectricSystem = new UpdateElectricSystem(blockStore, electricityStore);
  }

  onCommit(updates: UpdateBlocks) {
    this.updateElectricSystem.update(updates);
  }

  private updateElectricSystem: UpdateElectricSystem;
}

export default ElectricitySystemHook;
