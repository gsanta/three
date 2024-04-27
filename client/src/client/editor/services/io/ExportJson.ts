import { Store } from '@/client/common/utils/store';

class ExportJson {
  constructor(store: Store) {
    this.store = store;
  }

  export() {
    return JSON.stringify(this.store.getState().blocks.present);
  }

  private store: Store;
}

export default ExportJson;
