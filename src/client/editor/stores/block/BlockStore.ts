import { Store } from '@/client/common/utils/store';
import { BlockDecorations, BlockDecoratorName } from '@/client/editor/models/block/BlockDecoration';
import { BlockTypeName } from '../../models/block/BlockConstantData';

class BlockStore {
  constructor(store: Store) {
    this.store = store;
  }

  getHovered() {
    return this.getState().hovered;
  }

  getBlock(id?: string) {
    if (!id) {
      throw new Error('Id is not defined');
    }

    return this.getState().blocks[id];
  }

  getBlocks() {
    return this.getState().blocks;
  }

  getBlocksAsArray() {
    return Object.values(this.getState().blocks);
  }

  getBlocksByType(type: BlockTypeName) {
    const blocks = this.getBlocksAsArray();
    return blocks.filter((block) => block.type === type);
  }

  getRootBlock(blockId: string) {
    let block = this.getBlock(blockId);
    while (block.parentConnection) {
      block = this.getBlock(block.parentConnection.block);
    }

    return block;
  }

  getDecorator<T extends BlockDecoratorName>(decoratorName: T, id?: string): BlockDecorations[T] {
    if (!id) {
      throw new Error('Id is not defined');
    }

    const decoration = this.getState().decorations[decoratorName][id];

    if (!decoration) {
      throw new Error(`Decoration '${decoratorName}' not found`);
    }

    return decoration as BlockDecorations[T];
  }

  getDecorations<T extends BlockDecoratorName>(category: T) {
    return this.getState().decorations[category];
  }

  getBlockSettings() {
    return this.store.getState().blockType;
  }

  getBlockType(type: string) {
    const blockType = this.store.getState().blockType.blocks.find((block) => block.type === type);

    if (!blockType) {
      throw new Error(`Block type ${type} not found`);
    }

    return blockType;
  }

  private getState() {
    return this.store.getState().block;
  }

  private store: Store;
}

export default BlockStore;
