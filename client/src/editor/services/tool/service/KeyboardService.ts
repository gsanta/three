import { Store } from '@/common/utils/store';
import { deleteMeshes, setSelectedBlocks } from '../../scene/blocksSlice';

class KeyboardService {
  constructor(store: Store) {
    this.store = store;
  }

  onKeyDown(keyEvent: KeyboardEvent) {
    if (keyEvent.key === 'Backspace') {
      const selectedIds = this.store.getState().blocks.present.selectedBlockIds;
      this.store.dispatch(setSelectedBlocks([]));
      this.store.dispatch(deleteMeshes(selectedIds || []));
    }
  }

  private store: Store;
}

export default KeyboardService;
