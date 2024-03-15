import { Store } from '@/common/utils/store';
import { deleteMeshes } from '../../scene/sceneSlice';
import { setSelectedMeshes } from '../../builder/builderSlice';

class KeyboardService {
  constructor(store: Store) {
    this.store = store;
  }

  onKeyDown(keyEvent: KeyboardEvent) {
    if (keyEvent.key === 'Backspace') {
      const selectedIds = this.store.getState().builder.present.selectedMeshIds;
      this.store.dispatch(setSelectedMeshes([]));
      this.store.dispatch(deleteMeshes(selectedIds || []));
    }
  }

  private store: Store;
}

export default KeyboardService;
