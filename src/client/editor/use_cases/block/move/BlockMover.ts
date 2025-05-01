/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockType from '@/client/editor/types/BlockType';
import Edit from '../../../services/transaction/Edit';

abstract class BlockMover {
  readonly category: string;

  constructor(category: string) {
    this.category = category;
  }

  move(_edit: Edit, _block: BlockType) {
    throw new Error('Unimplemented method');
  }
}

export default BlockMover;
