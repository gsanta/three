import Edit from './Edit';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';
import SceneService from '../../ui/scene/service/SceneService';
import Device from '../../models/block/categories/Device';
import TransactionHook from './TransactionHook';
import EditorContextType from '../../setupEditor';

class TransactionService {
  constructor(
    blockStore: BlockStore,
    dispatchStore: Store,
    sceneService: SceneService,
    systemHooks: TransactionHook[],
  ) {
    this.store = blockStore;
    this.dispatchStore = dispatchStore;
    this.sceneService = sceneService;
    this.systemHooks = systemHooks;

    this.close = this.close.bind(this);
  }

  getOrCreateActiveTransaction(): Edit {
    return this.activeTransaction ? this.activeTransaction : this.createTransaction();
  }

  createTransaction(): Edit {
    if (!this.editorContext) {
      throw new Error('Set editorContext into TransactionService before creating transaction');
    }

    const edit = new Edit(this.store, this.dispatchStore, this.editorContext, this.systemHooks, this.close);
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

  private sceneService: SceneService;
}

export default TransactionService;
