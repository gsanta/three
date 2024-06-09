/* eslint-disable @typescript-eslint/no-unused-vars */
import Block from '@/client/editor/types/Block';
import BlockDecoration, { BlockCategories } from '@/client/editor/types/BlockCategory';
import Edit from '../../../services/update/Edit';
import Num3 from '@/client/editor/types/Num3';

abstract class BlockMover {
  readonly category: BlockDecoration;

  constructor(category: BlockDecoration) {
    this.category = category;
  }

  move(_edit: Edit, _block: Block, _dragDelta: Num3) {
    throw new Error('Unimplemented method');
  }
}

export default BlockMover;
