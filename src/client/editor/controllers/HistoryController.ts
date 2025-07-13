import { Store } from '@/client/common/utils/store';
import { undoAction } from '../stores/block/blockActions';

class HistoryController {
  constructor(store: Store) {
    this.store = store;
  }

  undo() {
    this.store.dispatch(undoAction());
  }

  private store: Store;
}

export default HistoryController;
