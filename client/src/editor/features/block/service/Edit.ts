import BlockCategory, { BlockCategories } from '@/editor/types/BlockCategory';
import BlockFactory from './factory/BlockFactory';
import { BlockUpdate, DecorationUpdate, UpdateBlocks, updateBlocks } from '@/editor/services/scene/blocksSlice';
import { BlockName } from '@/editor/types/BlockType';
import { PartialDeep } from 'type-fest';
import { getBlock } from '../utils/blockUtils';
import Block from '@/editor/types/Block';
import CableFactory from './factory/CableFactory';
import DefaultBlockFactory from './factory/DefaultBlockFactory';
import PoleFactory from './factory/PoleFactory';
import BlockStore from './BlockStore';
import { Store } from '@/common/utils/store';

class Edit {
  constructor(store: BlockStore, dispatchStore: Store) {
    this.store = store;
    this.dispatchStore = dispatchStore;

    this.updaters.poles = new PoleFactory('poles');
    this.updaters.decorations = new DefaultBlockFactory<'decorations'>('decorations');
    this.updaters.walls = new DefaultBlockFactory<'walls'>('walls');
    this.updaters.cables = new CableFactory();
  }

  commit() {
    this.dispatchStore.dispatch(updateBlocks(this.updates));
  }

  create<T extends BlockCategory | never = never>(
    blockName: BlockName,
    options: Partial<Block> = {},
    decorationOptions: Partial<BlockCategories[T]> = {},
  ): this {
    const blocks = this.store.getBlockSettings().blocks;
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

    this.updateBlock(id, block);
    this.updateDecoration(category, id, decoration);
  }

  updateBlock(id: string, update: PartialDeep<Block>, options: { mergeArrays: boolean } = { mergeArrays: true }): this {
    if (this.isRemoved(id)) {
      return this;
    }
    const origBlock = this.store.getBlocks()[id];
    const [prevBlock, index] = this.getBlockFromUpdates(id);

    const newBlock = this.mergeBlocks(prevBlock || origBlock, update, options);

    if (index !== -1) {
      this.updates.splice(index, 1);
    }

    this.updates.push({ block: newBlock });

    return this;
  }

  updateDecoration<T extends BlockCategory>(category: T, id: string, partial: PartialDeep<BlockCategories[T]>): this {
    if (this.isRemoved(id)) {
      return this;
    }

    const origDecoration = this.store.getDecoration(category, id);
    const [prevDecoration, index] = this.getDecorationFromUpdates(id);

    const updated =
      this.updaters[category]?.updateDecoration((prevDecoration as BlockCategories[T]) || origDecoration, partial) ||
      ({
        category,
        id,
      } as BlockCategories[T]);

    if (index !== -1) {
      this.updates.splice(index, 1);
    }

    this.updates.push({ decoration: updated });

    return this;
  }

  remove(id: string): this {
    const [prevBlock, blockIndex] = this.getBlockFromUpdates(id);
    const [prevDecoration, decorationIndex] = this.getDecorationFromUpdates(id);

    if (prevBlock) {
      this.updates.splice(blockIndex, 1);
    }

    if (prevDecoration) {
      this.updates.splice(decorationIndex, 1);
    }

    this.updates.push({ remove: this.store.getBlocks()[id] });

    return this;
  }

  select(id: string | null): this {
    this.updates.push({ select: id });

    return this;
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

  private getBlockFromUpdates(id: string): [Block | undefined, number] {
    const index = this.updates.findIndex((update) => ('block' in update ? update.block.id === id : false));

    if (index === -1) {
      return [undefined, -1];
    }

    return [(this.updates[index] as BlockUpdate).block, index];
  }

  private getDecorationFromUpdates(id: string): [BlockCategories[BlockCategory] | undefined, number] {
    const index = this.updates.findIndex((update) => ('decoration' in update ? update.decoration.id === id : false));

    if (index === -1) {
      return [undefined, -1];
    }

    return [(this.updates[index] as DecorationUpdate<BlockCategory>).decoration, index];
  }

  private isRemoved(id: string) {
    return this.updates.find((update) => ('remove' in update ? update.remove.id === id : false));
  }

  private updates: UpdateBlocks = [];

  private updaters: Partial<{ [K in keyof BlockCategories]: BlockFactory<K> }> = {};

  private store: BlockStore;

  private dispatchStore: Store;
}

export default Edit;
