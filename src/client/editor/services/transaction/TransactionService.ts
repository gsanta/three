import Edit from '../update/Edit';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';
import SceneService from '../../components/scene/SceneService';
import Device from '../../types/block/Device';

class TransactionService {
  constructor(blockStore: BlockStore, dispatchStore: Store, sceneService: SceneService) {
    this.store = blockStore;
    this.dispatchStore = dispatchStore;
    this.sceneService = sceneService;
  }

  getTransaction(): Edit {
    return new Edit(this.store, this.dispatchStore);
  }

  updateDevice(id: string, device: Partial<Device>) {
    this.getTransaction().updateDecoration('devices', id, device).commit();
  }

  private store: BlockStore;

  private dispatchStore: Store;

  private sceneService: SceneService;
}

export default TransactionService;
