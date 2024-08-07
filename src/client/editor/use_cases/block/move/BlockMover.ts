/* eslint-disable @typescript-eslint/no-unused-vars */
import Block from '@/client/editor/types/Block';
import Edit from '../../../services/transaction/Edit';

abstract class BlockMover {
  readonly category: string;

  constructor(category: string) {
    this.category = category;
  }

  move(_edit: Edit, _block: Block) {
    throw new Error('Unimplemented method');
  }
}

export default BlockMover;
