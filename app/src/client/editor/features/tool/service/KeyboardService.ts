import { Store } from '@/client/common/utils/store';
import { setSelection } from '../../block/blockSlice';

class KeyboardService {
  constructor(store: Store) {
    this.store = store;
  }

  onKeyDown(keyEvent: KeyboardEvent) {
    if (keyEvent.key === 'Backspace') {
      this.store.dispatch(setSelection([]));
    }
  }

  private store: Store;
}

export default KeyboardService;
