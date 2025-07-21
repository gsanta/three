import BlockData from './BlockData';
import { BlockCategoryName } from './BlockCategoryName';
import CableModel from './categories/CableModel';

class BlockModel {
  constructor(block: BlockData) {
    this.block = block;
  }

  checkCategory(category: BlockCategoryName) {
    if (this.block.category !== category) {
      throw new Error(`Precondition failed: expected category: '${category}, actual category ${this.block.category}`);
    }
  }

  getBlock() {
    return this.block;
  }

  getConduit;

  getId() {
    return this.block.id;
  }

  getType() {
    return this.block;
  }

  isCable(): this is CableModel {
    return this.block.category === 'cables';
  }

  protected block: BlockData;
}

export default BlockModel;
