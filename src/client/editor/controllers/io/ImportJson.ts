import { Store } from '@/client/common/utils/store';
import { BlockState, update } from '../../stores/block/blockSlice';

class ImportJson {
  constructor(store: Store) {
    this.store = store;
  }

  import(json: string) {
    const sceneState: Partial<BlockState> = JSON.parse(json);
    this.store.dispatch(update(sceneState));
  }

  private store: Store;
}

export default ImportJson;
