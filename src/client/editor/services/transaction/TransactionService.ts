import Edit from '../update/Edit';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';
import SceneService from '../../components/scene/service/SceneService';
import Device from '../../types/block/Device';
import SystemHook from '../update/SystemHook';

class TransactionService {
  constructor(blockStore: BlockStore, dispatchStore: Store, sceneService: SceneService, systemHooks: SystemHook[]) {
    this.store = blockStore;
    this.dispatchStore = dispatchStore;
    this.sceneService = sceneService;
    this.systemHooks = systemHooks;
  }

  getTransaction(): Edit {
    return new Edit(this.store, this.dispatchStore, this.systemHooks);
  }

  updateDevice(id: string, device: Partial<Device>) {
    this.getTransaction().updateDecoration('devices', id, device).commit();
  }

  private store: BlockStore;

  private dispatchStore: Store;

  private systemHooks: SystemHook[] = [];

  private sceneService: SceneService;
}

export default TransactionService;
