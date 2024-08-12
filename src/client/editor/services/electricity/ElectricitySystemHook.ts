import BlockStore from '../../stores/block/BlockStore';
import { UpdateBlocks } from '../../stores/block/blockSlice.types';
import ElectricityStore from '../../stores/electricity/ElectricityStore';
import SystemHook from '../transaction/SystemHook';
import UpdateElectricSystem from './UpdateElectricSystem';

class ElectricitySystemHook extends SystemHook {
  constructor(blockStore: BlockStore, electricityStore: ElectricityStore) {
    super();

    this.updateElectricSystem = new UpdateElectricSystem(blockStore, electricityStore);
  }

  onCommit(updates: UpdateBlocks['blockUpdates']) {
    this.updateElectricSystem.update(updates);
  }

  private updateElectricSystem: UpdateElectricSystem;
}

export default ElectricitySystemHook;
