/* eslint-disable @typescript-eslint/no-unused-vars */
import Block from '@/client/editor/types/Block';
import BlockCategory from '@/client/editor/types/BlockCategory';
import Edit from '../../../services/update/Edit';

abstract class BlockEraser {
  readonly category: BlockCategory;

  constructor(category: BlockCategory) {
    this.category = category;
  }

  eraseDependent(edit: Edit, block: Block, dependent: Block) {}
}

export default BlockEraser;
