import { Store } from '@/client/common/utils/store';
import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import BlockStore from '../block/BlockStore';
import BlockCategoryAction, { BlockCategoryActionName } from './BlockCategoryAction';

class BlockCategoryStore {
  constructor(store: Store, blockStore: BlockStore, actions: Record<BlockCategoryActionName, BlockCategoryAction>) {
    this.store = store;
    this.blockStore = blockStore;
    this.actions = actions;
  }

  getActions(category: BlockCategoryName) {
    const actions: BlockCategoryAction[] = [this.actions['delete-action']];

    switch (category) {
      case 'poles':
        actions.push(this.actions['join-cable-action']);
        break;
    }

    return actions;
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

  private actions: Record<BlockCategoryActionName, BlockCategoryAction>;

  private store: Store;

  private blockStore: BlockStore;
}

export default BlockCategoryStore;
