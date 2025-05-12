/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockData from '@/client/editor/models/block/BlockData';
import Edit from '../../../services/transaction/Edit';
import { BlockCategoryName } from '@/client/editor/models/block/BlockCategoryName';

abstract class BlockEraser {
  readonly category: BlockCategoryName;

  constructor(category: BlockCategoryName) {
    this.category = category;
  }

  erase(_edit: Edit, _block: BlockData) {}

  associationErased(_edit: Edit, _cableBlock: BlockData, _association: BlockData) {}

  eraseDependent(_edit: Edit, _block: BlockData, _dependent: BlockData) {}
}

export default BlockEraser;
