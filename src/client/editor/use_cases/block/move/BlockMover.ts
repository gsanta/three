/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockData from '@/client/editor/data/BlockData';
import Edit from '../../../services/transaction/Edit';

abstract class BlockMover {
  readonly category: string;

  constructor(category: string) {
    this.category = category;
  }

  move(_edit: Edit, _block: BlockData) {
    throw new Error('Unimplemented method');
  }
}

export default BlockMover;
