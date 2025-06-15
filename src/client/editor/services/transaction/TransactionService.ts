import Edit from './Edit';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';
import Device from '../../models/block/categories/Device';
import TransactionHook from './TransactionHook';
import EditorContextType from '../../setupEditor';

class TransactionService {
  constructor(blockStore: BlockStore, dispatchStore: Store, systemHooks: TransactionHook[]) {
    this.store = blockStore;
    this.dispatchStore = dispatchStore;
    this.systemHooks = systemHooks;

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
    if (!this.editorContext) {
      throw new Error('Set editorContext into TransactionService before creating transaction');
    }

    const edit = new Edit(this.store, this.dispatchStore, this.systemHooks, this.close);
    this.activeTransaction = edit;

    return edit;
  }

  setEditorContext(editorContext: EditorContextType) {
    this.editorContext = editorContext;
  }

  updateDevice(id: string, device: Partial<Device>) {
    this.createTransaction().updateDecoration('devices', id, device).commit();
  }

  private close() {
    this.activeTransaction = undefined;
  }

  private activeTransaction: Edit | undefined;

  private store: BlockStore;

  private dispatchStore: Store;

  private editorContext: EditorContextType | undefined;

  private systemHooks: TransactionHook[] = [];
}

export default TransactionService;
