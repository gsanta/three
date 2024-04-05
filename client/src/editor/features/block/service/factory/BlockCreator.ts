import { Store } from '@/common/utils/store';
import { BlockType } from '@/editor/types/Block';

abstract class BlockCreator {
  readonly type: BlockType;

  constructor(store: Store, type: BlockType) {
    this.type = type;
    this.store = store;
  }

  protected store: Store;
}

export default BlockCreator;
