/* eslint-disable @typescript-eslint/no-unused-vars */
import Block from '@/client/editor/types/Block';
import BlockCategory, { BlockCategories } from '@/client/editor/types/BlockCategory';
import Edit from '../../../features/block/services/update/Edit';

abstract class BlockMover {
  readonly category: BlockCategory;

  constructor(category: BlockCategory) {
    this.category = category;
  }

  move(edit: Edit, block: Block) {
    throw new Error('Unimplemented method');
  }
}

export default BlockMover;
