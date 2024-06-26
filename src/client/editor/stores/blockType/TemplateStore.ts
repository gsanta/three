import { Store } from '@/client/common/utils/store';

class TemplateStore {
  constructor(store: Store) {
    this.store = store;
  }

  getTemplates() {
    return this.store.getState().blockType.blocks;
  }

  private store: Store;
}

export default TemplateStore;
