import { Store } from '@/client/common/utils/store';
import { setSelectedBlocks } from '../../block/blockSlice';

class KeyboardService {
  constructor(store: Store) {
    this.store = store;
  }

  onKeyDown(keyEvent: KeyboardEvent) {
    if (keyEvent.key === 'Backspace') {
      this.store.dispatch(setSelectedBlocks([]));
    }
  }

  private store: Store;
}

export default KeyboardService;
