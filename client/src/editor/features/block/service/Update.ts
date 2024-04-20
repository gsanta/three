import BlockCategory, { BlockCategories } from '@/editor/types/BlockCategory';
import BlockFactory from './factory/BlockFactory';
import { UpdateBlocks } from '@/editor/services/scene/blocksSlice';
import { BlockName } from '@/editor/types/BlockType';
import { PartialDeep } from 'type-fest';
import { getBlock } from '../utils/blockUtils';
import Block from '@/editor/types/Block';
import CableFactory from './factory/CableFactory';
import DefaultBlockFactory from './factory/DefaultBlockFactory';
import PoleFactory from './factory/PoleFactory';
import BlockStore from './BlockStore';

class Update {
  constructor(store: BlockStore) {
    this.store = store;

    this.updaters.poles = new PoleFactory('poles');
    this.updaters.decorations = new DefaultBlockFactory('decorations');
    this.updaters.walls = new DefaultBlockFactory('walls');
    this.updaters.cables = new CableFactory();
  }

  execute() {}

  create<T extends BlockCategory | never = never>(
    blockName: BlockName,
    options: Partial<Block> = {},
    decorationOptions: Partial<BlockCategories[T]> = {},
  ): this {
    const blocks = this.store.getBlockSettings();
    const blockType = getBlock(blocks, blockName);

    const factory = this.updaters[blockType.category as T];

    if (!factory) {
      throw new Error(`Factory for type ${blockType.category} not found`);
    }

    const { block, decoration } = factory.create(blockType, options, decorationOptions);

    this.updates.push({ block, decoration });

    return this;
  }

  update<T extends BlockCategory>(id: string, block: Partial<Block>, decoration: PartialDeep<BlockCategories[T]>) {
    const blocks = this.store.getBlocks();
    const origBlock = blocks[id];

    const category = origBlock.category as T;

    const updatedBlock = this.mergeBlocks(origBlock, block);
    const origDecoration = this.store.getDecoration(category, id);
    const updatedDecoration = this.updaters[category]?.updateDecoration(origDecoration, decoration);

    if (!updatedDecoration) {
      throw new Error(`No updater found for type ${category}`);
    }

    this.updates.push({ block: updatedBlock });
    this.updates.push({ decoration: updatedDecoration });
  }

  updateBlock(id: string, update: PartialDeep<Block>, options: { mergeArrays: boolean } = { mergeArrays: true }): this {
    const block = this.store.getBlocks()[id];

    const newBlock = this.mergeBlocks(block, update, options);

    this.updates.push({ block: newBlock });

    return this;
  }

  updateAssociation<T extends BlockCategory>(type: T, id: string, partial: PartialDeep<BlockCategories[T]>): this {
    const orig = this.store.getDecoration(type, id);
    const updated = this.updaters[type]?.updateDecoration(orig, partial);

    if (!updated) {
      throw new Error(`No updater found for type ${type}`);
    }

    this.updates.push({ decoration: updated });

    return this;

    // return updated as BlockCategories[T];

    // this.store.dispatch(updateBlockDecoration({ id: id, key: type, val: updated }));
  }

  remove(id: string) {
    this.updates.push({ remove: this.store.getBlocks()[id] });
  }

  getLastBlock() {
    const lastUpdateWithBlock = this.updates.reverse().find((update) => !Boolean('block' in update)) as {
      block: Block;
    };

    const block = lastUpdateWithBlock.block;

    if (!block) {
      throw new Error('Block not found in updates');
    }

    return block;
  }

  private mergeBlocks(
    orig: Block,
    update: PartialDeep<Block>,
    { mergeArrays }: { mergeArrays: boolean } = { mergeArrays: true },
  ) {
    return {
      ...orig,
      ...update,
      dependents: mergeArrays ? [...new Set([...orig.dependents, ...(update.dependents || [])])] : update.dependents,
      dependsOn: [...new Set([...orig.dependsOn, ...(update.dependsOn || [])])],
      children: [...new Set([...orig.children, ...(update.children || [])])],
    } as Block;
  }

  private updates: UpdateBlocks = [];

  private updaters: Partial<{ [K in keyof BlockCategories]: BlockFactory<K> }> = {};

  private store: BlockStore;
}

export default Update;
