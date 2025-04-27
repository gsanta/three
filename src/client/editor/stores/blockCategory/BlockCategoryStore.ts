import { Store } from '@/client/common/utils/store';
import { BlockCategoryName } from '../../models/block/BlockCategory';
import BlockStore from '../block/BlockStore';

class BlockCategoryStore {
  constructor(store: Store, blockStore: BlockStore) {
    this.store = store;
    this.blockStore = blockStore;
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

  getSelectedBlocks() {
    return this.getState().selectedBlocks;
  }

  getSelectedRootBlockIds() {
    return this.getState().selectedRootBlockIds;
  }

  getSelectedBlock({ category }: { category?: string } = {}) {
    let selectedBlocks = this.getSelectedRootBlockIds();

    if (category) {
      selectedBlocks = selectedBlocks.filter(
        (currBlockId) => this.blockStore.getBlock(currBlockId).category === category,
      );
    }

    if (selectedBlocks.length === 1) {
      return selectedBlocks[0];
    }

    return null;
  }

  private getState() {
    return this.store.getState().blockCategory;
  }

  private store: Store;

  private blockStore: BlockStore;
}

export default BlockCategoryStore;
