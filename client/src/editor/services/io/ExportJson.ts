import { Store } from '@/common/utils/store';

class ExportJson {
  constructor(store: Store) {
    this.store = store;
  }

  export() {
    return JSON.stringify(this.store.getState().scene.present);
  }

  private store: Store;
}

export default ExportJson;
