import { Store } from '@/common/utils/store';
import { BlocksState, update } from '../scene/blocksSlice';

class ImportJson {
  constructor(store: Store) {
    this.store = store;
  }

  import(json: string) {
    const sceneState: Partial<BlocksState> = JSON.parse(json);
    this.store.dispatch(update(sceneState));
  }

  private store: Store;
}

export default ImportJson;
