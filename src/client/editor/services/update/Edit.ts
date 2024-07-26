import BlockDecoration, { BlockCategories } from '@/client/editor/types/BlockCategory';
import { PartialDeep } from 'type-fest';
import Block, { mergeBlocks } from '@/client/editor/types/Block';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';
import mergeDeep, { MergeStrategy } from '../../utils/mergeDeep';
import BlockUpdater from '../transaction/updaters/BlockUpdater';
import LampUpdater from '../transaction/updaters/LampUpdater';
import SystemHook from './SystemHook';
import { updateBlocks } from '../../stores/block/blockActions';
import { BlockUpdate, DecorationUpdate, UpdateBlocks } from '../../stores/block/blockSlice.types';

class Edit {
  constructor(store: BlockStore, dispatchStore: Store, systemHooks: SystemHook[]) {
    this.store = store;
    this.systemHooks = systemHooks;
    this.dispatchStore = dispatchStore;

    this.updaters.lamps = new LampUpdater(store);
  }

  commit(history?: boolean) {
    if (!this.updates.length) {
      return;
    }

    this.updates.forEach((update) => {
      if ('type' in update && update.type === 'update' && 'decoration' in update) {
        const block = this.store.getBlock(update.decoration.id);
        this.updaters[block?.category]?.onUpdateDecorators(this, block, update.decoration);
      }
    });

    this.dispatchStore.dispatch(updateBlocks({ blockUpdates: this.updates, history }));

    this.systemHooks.forEach((systemHook) => systemHook.onCommit(this.updates));
  }

  create(block: Block): this {
    this.updates.push({ type: 'update', slice: this.targetSlice, block });

    return this;
  }

  createDecoration<T extends BlockDecoration>(data: BlockCategories[T]): this {
    this.updates.push({ type: 'update', slice: 'city', decoration: data });

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

    this.updates.push({ type: 'update', slice: this.targetSlice, block: newBlock });

    return this;
  }

  updateDecoration<T extends BlockDecoration>(
    category: T,
    id: string,
    partial: PartialDeep<BlockCategories[T], object>,
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

    this.updates.push({ type: 'update', slice: 'city', decoration: updated });

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

    this.updates.push({ remove: this.store.getBlocks()[id], slice: 'city' });

    return this;
  }

  select(id: string | null, partIndex?: string): this {
    this.updates.push({ select: id, slice: 'city', partIndex });

    return this;
  }

  getLastBlock() {
    let lastUpdateWithBlock: { block: Block } | undefined = undefined;

    for (let i = this.updates.length - 1; i >= 0; i--) {
      if ('block' in this.updates[i]) {
        lastUpdateWithBlock = this.updates[i] as { block: Block };
        break;
      }
    }

    const block = lastUpdateWithBlock?.block;

    if (!block) {
      throw new Error('Block not found in updates');
    }

    return block;
  }

  setTargetSlice(slice: 'city' | 'building') {
    this.targetSlice = slice;
  }

  private mergeBlocks(
    orig: Block,
    update: PartialDeep<Block>,
    options: { arrayMergeStrategy: MergeStrategy } = { arrayMergeStrategy: 'merge' },
  ) {
    const { arrayMergeStrategy } = options;

    return mergeBlocks(orig, update, arrayMergeStrategy);
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

  private updates: UpdateBlocks['blockUpdates'] = [];

  private updaters: Record<string, BlockUpdater> = {};

  private systemHooks: SystemHook[];

  private store: BlockStore;

  private dispatchStore: Store;

  private targetSlice: 'city' | 'building' = 'city';
}

export default Edit;
