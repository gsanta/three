import { Store } from '@/common/utils/store';
import { SceneState, update } from '../scene/sceneSlice';

class ImportJson {
  constructor(store: Store) {
    this.store = store;
  }

  import(json: string) {
    const sceneState: Partial<SceneState> = JSON.parse(json);
    this.store.dispatch(update(sceneState));
  }

  private store: Store;
}

export default ImportJson;
