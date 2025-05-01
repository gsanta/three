import BlockType from '../../types/BlockType';
import { BlockCategoryName } from './BlockCategory';

class Block {
  constructor(block: BlockType) {
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

  protected block: BlockType;
}

export default Block;
