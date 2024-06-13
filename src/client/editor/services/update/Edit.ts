import BlockDecoration, { BlockCategories, BlockCategoryType } from '@/client/editor/types/BlockCategory';
import { BlockUpdate, DecorationUpdate, UpdateBlocks, updateBlocks } from '@/client/editor/stores/block/blockSlice';
import { PartialDeep } from 'type-fest';
import Block, { BlockSlotSource } from '@/client/editor/types/Block';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';
import mergeDeep, { MergeStrategy, mergeArrays } from '../../utils/mergeDeep';
import BlockUpdater from '../transaction/updaters/BlockUpdater';
import LampUpdater from '../transaction/updaters/LampUpdater';

const mergeSlotSources = (
  arr1: Block['slotSources'],
  arr2: Block['slotSources'] | undefined,
  mergeStrategy: MergeStrategy,
) => {
  const find = (arr: Block['slotSources'], source: BlockSlotSource) => {
    return arr.find(
      (existingSource) => existingSource.blockId === source.blockId && existingSource.slotName === source.slotName,
    );
  };

  if (mergeStrategy === 'merge') {
    const ret = [...(arr1 || [])];

    arr2?.forEach((slotSource) => {
      if (!find(arr1, slotSource)) {
        ret.push(slotSource);
      }
    });

    return ret;
  }

  return arr1.filter((slotSource) => !arr2 || !find(arr2, slotSource));
};

class Edit {
  constructor(store: BlockStore, dispatchStore: Store) {
    this.store = store;
    this.dispatchStore = dispatchStore;

    this.updaters.lamps = new LampUpdater(store);
  }

  commit() {
    this.updates.forEach((update) => {
      if ('type' in update && update.type === 'update' && 'decoration' in update) {
        const block = this.store.getBlock(update.decoration.id);
        this.updaters[block?.category]?.onUpdateDecorators(this, block, update.decoration);
      }
    });

    this.dispatchStore.dispatch(updateBlocks(this.updates));
  }

  create(block: Block): this {
    this.updates.push({ type: 'update', block });

    return this;
  }

  createDecoration<T extends BlockDecoration>(data: BlockCategories[T]): this {
    this.updates.push({ type: 'update', decoration: data });

    return this;
  }

  update<T extends BlockDecoration>(
    id: string,
    block: Partial<Block>,
    decorationType: BlockDecoration,
    decoration: PartialDeep<BlockCategories[T]>,
  ) {
    this.updateBlock(id, block);
    this.updateDecoration(decorationType, id, decoration);

    return this;
  }

  updateBlock(
    id: string,
    update: PartialDeep<Block>,
    options: { arrayMergeStrategy: MergeStrategy } = { arrayMergeStrategy: 'merge' },
  ): this {
    if (this.isRemoved(id)) {
      return this;
    }
    const origBlock = this.store.getBlocks()[id];
    const [prevUpdate, index] = this.getBlockFromUpdates(id);

    const newBlock = this.mergeBlocks(prevUpdate?.block || origBlock, update, options);

    if (index !== -1) {
      this.updates.splice(index, 1);
    }

    this.updates.push({ type: 'update', block: newBlock });

    return this;
  }

  updateDecoration<T extends BlockDecoration>(
    category: T,
    id: string,
    partial: PartialDeep<BlockCategoryType>,
    options: { arrayMergeStrategy: MergeStrategy } = { arrayMergeStrategy: 'merge' },
  ): this {
    if (this.isRemoved(id)) {
      return this;
    }

    const origDecoration = this.store.getDecoration(category, id);
    const [prevUpdate, index] = this.getDecorationFromUpdates(id);
    const prevDecoration = prevUpdate?.decoration as BlockCategories[T];

    const updated = mergeDeep(prevDecoration || origDecoration, partial, options.arrayMergeStrategy);

    if (index !== -1) {
      this.updates.splice(index, 1);
    }

    this.updates.push({ type: 'update', decoration: updated });

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

  select(id: string | null, partIndex?: string): this {
    this.updates.push({ select: id, partIndex });

    return this;
  }

  getLastBlock() {
    const lastUpdateWithBlock = this.updates.reverse().find((update) => Boolean('block' in update)) as {
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
    options: { arrayMergeStrategy: MergeStrategy } = { arrayMergeStrategy: 'merge' },
  ) {
    const { arrayMergeStrategy } = options;

    return {
      ...orig,
      ...update,
      dependents: mergeArrays(orig.dependents, update.dependents, arrayMergeStrategy),
      dependsOn: mergeArrays(orig.dependsOn, update.dependsOn, arrayMergeStrategy),
      children: mergeArrays(orig.children, update.children, arrayMergeStrategy),
      slotSources: mergeSlotSources(orig.slotSources || [], update.slotSources, arrayMergeStrategy),
    } as Block;
  }

  private getBlockFromUpdates(id: string): [BlockUpdate | undefined, number] {
    const index = this.updates.findIndex((update) => ('block' in update ? update.block?.id === id : false));

    if (index === -1) {
      return [undefined, -1];
    }

    return [this.updates[index] as BlockUpdate | undefined, index];
  }

  private getDecorationFromUpdates(id: string): [DecorationUpdate<BlockDecoration> | undefined, number] {
    const index = this.updates.findIndex((update) => ('decoration' in update ? update.decoration.id === id : false));

    if (index === -1) {
      return [undefined, -1];
    }

    return [this.updates[index] as DecorationUpdate<BlockDecoration> | undefined, index];
  }

  private isRemoved(id: string) {
    return this.updates.find((update) => ('remove' in update ? update.remove.id === id : false));
  }

  private updates: UpdateBlocks = [];

  private updaters: Record<string, BlockUpdater> = {};

  private store: BlockStore;

  private dispatchStore: Store;
}

export default Edit;
