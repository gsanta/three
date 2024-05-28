import Edit from './Edit';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';
import SceneService from '../../components/scene/SceneService';

class TransactionService {
  constructor(blockStore: BlockStore, dispatchStore: Store, sceneService: SceneService) {
    this.store = blockStore;
    this.dispatchStore = dispatchStore;
    this.sceneService = sceneService;
  }

  getUpdate(): Edit {
    return new Edit(this.store, this.dispatchStore, this.sceneService);
  }

  private store: BlockStore;

  private dispatchStore: Store;

  private sceneService: SceneService;
}

export default TransactionService;
