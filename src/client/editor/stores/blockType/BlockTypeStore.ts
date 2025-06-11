import { Store } from '@/client/common/utils/store';
import { BlockTypeName } from '../../models/block/BlockConstantData';
import { BlockDecoratorName } from '../../models/block/BlockDecoration';

class BlockTypeStore {
  constructor(store: Store) {
    this.store = store;
  }

  getActiveBlockType() {
    return this.getState().activeBlockType;
  }

  getBlockType(type: string) {
    const blockType = this.getBlockTypes().find((block) => block.type === type);

    if (!blockType) {
      throw new Error(`Block type ${type} not found`);
    }

    return blockType;
  }

  getBlockTypes() {
    return this.getState().blocks;
  }

  getDecorations(blockType: BlockTypeName) {
    return this.getState().decorations[blockType] || {};
  }

  getDecoration<T>(blockType: BlockTypeName, decoration: BlockDecoratorName) {
    return (this.getState().decorations[blockType][decoration] || {}) as T;
  }

  private getState() {
    return this.store.getState().blockType;
  }

  private store: Store;
}

export default BlockTypeStore;
