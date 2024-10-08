/* eslint-disable @typescript-eslint/no-unused-vars */
import Block from '@/client/editor/types/Block';
import BlockDecoration from '@/client/editor/types/BlockCategory';
import Edit from '../../../services/transaction/Edit';

abstract class BlockEraser {
  readonly category: BlockDecoration;

  constructor(category: BlockDecoration) {
    this.category = category;
  }

  erase(_edit: Edit, _block: Block) {}

  associationErased(_edit: Edit, _cableBlock: Block, _association: Block) {}

  eraseDependent(_edit: Edit, _block: Block, _dependent: Block) {}
}

export default BlockEraser;
