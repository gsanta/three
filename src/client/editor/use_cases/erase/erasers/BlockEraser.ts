/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockData from '@/client/editor/models/block/BlockData';
import BlockDecoration from '@/client/editor/models/block/BlockCategory';
import Edit from '../../../services/transaction/Edit';

abstract class BlockEraser {
  readonly category: BlockDecoration;

  constructor(category: BlockDecoration) {
    this.category = category;
  }

  erase(_edit: Edit, _block: BlockData) {}

  associationErased(_edit: Edit, _cableBlock: BlockData, _association: BlockData) {}

  eraseDependent(_edit: Edit, _block: BlockData, _dependent: BlockData) {}
}

export default BlockEraser;
