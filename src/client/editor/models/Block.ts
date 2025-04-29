import BlockType from './BlockType';
import { BlockCategoryName } from './block/BlockCategory';

class Block {
  constructor(block: BlockType) {
    this.block = block;
  }

  checkCategory(category: BlockCategoryName) {
    if (this.block.category !== category) {
      throw new Error(`Precondition failed: expected category: '${category}, actual category ${this.block.category}`);
    }
  }

  protected block: BlockType;
}

export default Block;
