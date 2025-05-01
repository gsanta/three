import Edit from './Edit';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';
import SceneService from '../../ui/scene/service/SceneService';
import Device from '../../models/block/Device';
import SystemHook from './SystemHook';

class TransactionService {
  constructor(blockStore: BlockStore, dispatchStore: Store, sceneService: SceneService, systemHooks: SystemHook[]) {
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
    const edit = new Edit(this.store, this.dispatchStore, this.systemHooks, this.close);
    this.activeTransaction = edit;

    return edit;
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

  private systemHooks: SystemHook[] = [];

  private sceneService: SceneService;
}

export default TransactionService;
