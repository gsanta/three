import Edit from './Edit';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';

class UpdateService {
  constructor(blockStore: BlockStore, dispatchStore: Store) {
    this.store = blockStore;
    this.dispatchStore = dispatchStore;
  }

  getUpdate(): Edit {
    return new Edit(this.store, this.dispatchStore);
  }

  private store: BlockStore;

  private dispatchStore: Store;
}

export default UpdateService;
