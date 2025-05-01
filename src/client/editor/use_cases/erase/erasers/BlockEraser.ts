/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockType from '@/client/editor/types/BlockType';
import BlockDecoration from '@/client/editor/models/BlockCategory';
import Edit from '../../../services/transaction/Edit';

abstract class BlockEraser {
  readonly category: BlockDecoration;

  constructor(category: BlockDecoration) {
    this.category = category;
  }

  erase(_edit: Edit, _block: BlockType) {}

  associationErased(_edit: Edit, _cableBlock: BlockType, _association: BlockType) {}

  eraseDependent(_edit: Edit, _block: BlockType, _dependent: BlockType) {}
}

export default BlockEraser;
