import { Store } from '@/client/common/utils/store';
import { BlockCategoryName } from '../../models/block/BlockCategory';

class BlockCategoryStore {
  constructor(store: Store) {
    this.store = store;
  }

  getAddMethods() {
    return this.getState().addMethods;
  }

  getAddMethodsByCategory(category: BlockCategoryName) {
    return this.getState().addMethods.filter((addMethod) => addMethod.sourceCategory === category);
  }

  getCategories() {
    return this.getState().blockCategories;
  }

  getBlockCategoryByName(name: BlockCategoryName) {
    return this.getState().blockCategories.find((blockCategory) => blockCategory.name === name);
  }

  private getState() {
    return this.store.getState().blockCategory;
  }

  private store: Store;
}

export default BlockCategoryStore;
