/* eslint-disable @typescript-eslint/no-unused-vars */
import { BlockDecorationType } from '@/client/editor/models/BlockCategory';
import Edit from '../Edit';
import BlockData from '@/client/editor/data/BlockData';

abstract class BlockUpdater {
  readonly type: string;

  constructor(type: string) {
    this.type = type;
  }

  onUpdateDecorators(_edit: Edit, _block: BlockData, _newState: BlockDecorationType): void {
    throw new Error('Unimplemented method');
  }
}

export default BlockUpdater;
