/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockCategory from '@/client/editor/types/BlockCategory';

abstract class BlockAdder {
  category: BlockCategory;

  constructor(category: BlockCategory) {
    this.category = category;
  }

  performAfter(_blockId: string) {}
}

export default BlockAdder;
