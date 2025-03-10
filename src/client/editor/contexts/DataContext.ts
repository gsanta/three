import BlockStore from '../stores/block/BlockStore';
import BlockCategoryStore from '../stores/blockCategory/BlockCategoryStore';
import BlockTypeStore from '../stores/blockType/BlockTypeStore';

class DataContext {
  constructor(block: BlockStore, blockCategory: BlockCategoryStore, blockType: BlockTypeStore) {
    this.block = block;
    this.blockType = blockType;
    this.blockCategory = blockCategory;
  }

  block: BlockStore;

  blockType: BlockTypeStore;

  blockCategory: BlockCategoryStore;
}

export default DataContext;
