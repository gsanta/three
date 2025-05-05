import BlockStore from '../../stores/block/BlockStore';
import { UpdateBlocks } from '../../stores/block/blockSlice.types';
import ElectricityStore from '../../stores/electricity/ElectricityStore';
import TransactionHook from '../transaction/TransactionHook';
import UpdateElectricSystem from './UpdateElectricSystem';

class ElectricitySystemHook implements TransactionHook {
  constructor(blockStore: BlockStore, electricityStore: ElectricityStore) {
    this.updateElectricSystem = new UpdateElectricSystem(blockStore, electricityStore);
  }

  onCommit(updates: UpdateBlocks['blockUpdates']) {
    this.updateElectricSystem.update(updates);
  }

  private updateElectricSystem: UpdateElectricSystem;
}

export default ElectricitySystemHook;
