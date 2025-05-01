import BlockData from '../../data/BlockData';
import { BlockCategoryName } from './BlockCategory';

class Block {
  constructor(block: BlockData) {
    this.block = block;
  }

  checkCategory(category: BlockCategoryName) {
    if (this.block.category !== category) {
      throw new Error(`Precondition failed: expected category: '${category}, actual category ${this.block.category}`);
    }
  }

  getType() {
    return this.block;
  }

  protected block: BlockData;
}

export default Block;
