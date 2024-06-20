/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockDecoration from '@/client/editor/types/BlockCategory';

abstract class BlockAdder {
  category: string;

  constructor(category: string) {
    this.category = category;
  }

  performAfter(_blockId: string) {}
}

export default BlockAdder;
