import Edit from './Edit';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';
import ElectricityStore from '../../stores/electricity/ElectricityStore';

class TransactionService {
  constructor(blockStore: BlockStore, dispatchStore: Store, electricsStore: ElectricityStore) {
    this.store = blockStore;
    this.dispatchStore = dispatchStore;
    this.electricsStore = electricsStore;

    this.close = this.close.bind(this);
  }

  getOrCreateActiveTransaction(): Edit {
    return this.activeTransaction ? this.activeTransaction : this.createTransaction();
  }

  getActiveTransaction(): Edit {
    if (!this.activeTransaction) {
      throw new Error('No active transaction found');
    }

    return this.activeTransaction;
  }

  hasActiveTransaction(): boolean {
    return !!this.activeTransaction;
  }

  createTransaction(): Edit {
    const edit = new Edit(this.store, this.dispatchStore, this.electricsStore, this.close);
    this.activeTransaction = edit;

    return edit;
  }

  private close() {
    this.activeTransaction = undefined;
  }

  private activeTransaction: Edit | undefined;

  private store: BlockStore;

  private dispatchStore: Store;

  private electricsStore: ElectricityStore;
}

export default TransactionService;
