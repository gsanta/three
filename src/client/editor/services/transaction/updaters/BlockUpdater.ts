/* eslint-disable @typescript-eslint/no-unused-vars */
import { BlockDecorationType } from '@/client/editor/models/BlockCategory';
import Edit from '../Edit';
import BlockType from '@/client/editor/models/BlockType';

abstract class BlockUpdater {
  readonly type: string;

  constructor(type: string) {
    this.type = type;
  }

  onUpdateDecorators(_edit: Edit, _block: BlockType, _newState: BlockDecorationType): void {
    throw new Error('Unimplemented method');
  }
}

export default BlockUpdater;
