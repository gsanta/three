/* eslint-disable @typescript-eslint/no-unused-vars */
import { BlockDecorationType } from '@/client/editor/types/BlockCategory';
import Edit from '../../update/Edit';
import Block from '@/client/editor/types/Block';

abstract class BlockUpdater {
  readonly type: string;

  constructor(type: string) {
    this.type = type;
  }

  onUpdateDecorators(_edit: Edit, _block: Block, _newState: BlockDecorationType): void {
    throw new Error('Unimplemented method');
  }
}

export default BlockUpdater;
