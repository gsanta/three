import { Store } from '@/client/common/utils/store';

class ToolStore {
  constructor(store: Store) {
    this.store = store;
  }

  getSelectOptions() {
    return this.store.getState().tool.select;
  }

  private store: Store;
}

export default ToolStore;
