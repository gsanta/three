/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockDecoration from '@/client/editor/types/BlockCategory';

abstract class BlockAdder {
  category: BlockDecoration;

  constructor(category: BlockDecoration) {
    this.category = category;
  }

  performAfter(_blockId: string) {}
}

export default BlockAdder;
