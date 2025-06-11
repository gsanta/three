/* eslint-disable @typescript-eslint/no-unused-vars */
import { BlockDecorationType } from '@/client/editor/models/block/BlockDecoration';
import Edit from '../Edit';
import BlockData from '@/client/editor/models/block/BlockData';

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
