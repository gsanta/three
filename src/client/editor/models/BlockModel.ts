import Block from './Block';
import { BlockCategoryName } from './block/BlockCategory';

class BlockModel {
  constructor(block: Block) {
    this.block = block;
  }

  checkCategory(category: BlockCategoryName) {
    if (this.block.category !== category) {
      throw new Error(`Precondition failed: expected category: '${category}, actual category ${this.block.category}`);
    }
  }

  protected block: Block;
}

export default BlockModel;
