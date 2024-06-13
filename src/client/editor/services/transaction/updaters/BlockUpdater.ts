/* eslint-disable @typescript-eslint/no-unused-vars */
import { BlockCategoryType } from '@/client/editor/types/BlockCategory';
import Edit from '../../update/Edit';
import Block from '@/client/editor/types/Block';

abstract class BlockUpdater {
  readonly type: string;

  constructor(type: string) {
    this.type = type;
  }

  onUpdateDecorators(_edit: Edit, _block: Block, _newState: BlockCategoryType): void {
    throw new Error('Unimplemented method');
  }
}

export default BlockUpdater;
