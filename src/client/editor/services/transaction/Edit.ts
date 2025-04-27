import BlockDecoration, { BlockCategories } from '@/client/editor/models/BlockCategory';
import { PartialDeep } from 'type-fest';
import Block, { mergeBlocks } from '@/client/editor/models/Block';
import BlockStore from '../../stores/block/BlockStore';
import { store, Store } from '@/client/common/utils/store';
import mergeDeep, { MergeStrategy } from '../../utils/mergeDeep';
import BlockUpdater from './updaters/BlockUpdater';
import LampUpdater from './updaters/LampUpdater';
import SystemHook from './SystemHook';
import { updateBlocks } from '../../stores/block/blockActions';
import { BlockUpdate, DecorationUpdate, UpdateBlocks } from '../../stores/block/blockSlice.types';

type EditOptions = {
  arrayMergeStrategy?: MergeStrategy;
  slice?: 'city' | 'building';
};

const getDefaultEditOptions = () => ({ arrayMergeStrategy: 'merge' as const, slice: store.getState().editor.mode });

class Edit {
  constructor(blockStore: BlockStore, dispatchStore: Store, systemHooks: SystemHook[], close: () => void) {
    this.store = blockStore;
    this.systemHooks = systemHooks;
    this.dispatchStore = dispatchStore;

    this.updaters.lamps = new LampUpdater(blockStore);

    this.close = close;
  }

  flush() {
    this.commitOrFlush(false);
  }

  commit(history?: boolean) {
    this.close();

    this.commitOrFlush(history === false ? false : true);
  }

  create(block: Block, options?: EditOptions): this {
    const mergedOptions = this.getMergedOptions(options);
    this.updates.push({ type: 'update', slice: mergedOptions.slice, block });

    return this;
  }

  createDecoration<T extends BlockDecoration>(data: BlockCategories[T], options?: EditOptions): this {
    const mergedOptions = this.getMergedOptions(options);

    this.updates.push({ type: 'update', slice: mergedOptions.slice, decoration: data });

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

  updateBlock(id: string, update: PartialDeep<Block>, options?: EditOptions): this {
    if (this.isRemoved(id)) {
      return this;
    }
    const mergedOptions = this.getMergedOptions(options);

    const origBlock = this.store.getBlocks()[id];
    const [prevUpdate, index] = this.getBlockFromUpdates(id);

    const newBlock = this.mergeBlocks(prevUpdate?.block || origBlock, update, options);

    if (index !== -1) {
      this.updates.splice(index, 1);
    }

    this.updates.push({ type: 'update', slice: mergedOptions.slice, block: newBlock });

    return this;
  }

  updateDecoration<T extends BlockDecoration>(
    category: T,
    id: string,
    partial: PartialDeep<BlockCategories[T], object>,
    options?: EditOptions,
  ): this {
    if (this.isRemoved(id)) {
      return this;
    }

    const mergedOptions = this.getMergedOptions(options);

    const origDecoration = this.store.getDecoration(category, id);
    const [prevUpdate, index] = this.getDecorationFromUpdates(id);
    const prevDecoration = prevUpdate?.decoration as BlockCategories[T];

    const updated = mergeDeep(prevDecoration || origDecoration, partial, mergedOptions.arrayMergeStrategy);

    if (index !== -1) {
      this.updates.splice(index, 1);
    }

    this.updates.push({ type: 'update', slice: mergedOptions.slice, decoration: updated });

    return this;
  }

  remove(id: string, options?: EditOptions): this {
    const mergedOptions = this.getMergedOptions(options);

    const [prevBlock, blockIndex] = this.getBlockFromUpdates(id);
    const [prevDecoration, decorationIndex] = this.getDecorationFromUpdates(id);

    if (prevBlock) {
      this.updates.splice(blockIndex, 1);
    }

    if (prevDecoration) {
      this.updates.splice(decorationIndex, 1);
    }

    this.updates.push({ remove: this.store.getBlocks()[id], slice: mergedOptions.slice });

    return this;
  }

  select(block: Block[], options?: EditOptions): this {
    const mergedOptions = this.getMergedOptions(options);

    this.updates.push({ select: block, slice: mergedOptions.slice });

    return this;
  }

  hover(id: string | null, partIndex?: string, options?: EditOptions): this {
    const mergedOptions = this.getMergedOptions(options);

    this.updates.push({ hover: id, slice: mergedOptions.slice, partIndex });

    return this;
  }

  hasLastBlock() {
    let lastUpdateWithBlock: { block: Block } | undefined = undefined;

    for (let i = this.updates.length - 1; i >= 0; i--) {
      if ('block' in this.updates[i]) {
        lastUpdateWithBlock = this.updates[i] as { block: Block };
        break;
      }
    }

    return Boolean(lastUpdateWithBlock?.block);
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

  private mergeBlocks(orig: Block, update: PartialDeep<Block>, options: EditOptions = getDefaultEditOptions()) {
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

  private getMergedOptions(options: EditOptions = {}) {
    const mergedOptions: EditOptions = { ...getDefaultEditOptions() };

    Object.keys(options).forEach((optionKey) => {
      const val = options[optionKey as keyof EditOptions];
      if (val) {
        (mergedOptions[optionKey as keyof EditOptions] as unknown) = val;
      }
    });

    return mergedOptions as Required<EditOptions>;
  }

  private commitOrFlush(updateHistory: boolean) {
    if (!this.updates.length) {
      return;
    }

    this.updates.forEach((update) => {
      if ('type' in update && update.type === 'update' && 'decoration' in update) {
        const block = this.store.getBlock(update.decoration.id);
        this.updaters[block?.category]?.onUpdateDecorators(this, block, update.decoration);
      }
    });

    this.dispatchStore.dispatch(updateBlocks({ blockUpdates: this.updates, history: updateHistory }));

    this.systemHooks.forEach((systemHook) => systemHook.onCommit(this.updates));

    this.updates = [];
  }

  private updates: UpdateBlocks['blockUpdates'] = [];

  private updaters: Record<string, BlockUpdater> = {};

  private systemHooks: SystemHook[];

  private store: BlockStore;

  private dispatchStore: Store;

  private close: () => void;
}

export default Edit;
