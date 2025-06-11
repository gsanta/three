import { BlockDecorations, BlockDecorationType } from '@/client/editor/models/block/BlockDecoration';
import { PartialDeep } from 'type-fest';
import BlockData, { mergeBlocks } from '@/client/editor/models/block/BlockData';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';
import mergeDeep, { MergeStrategy } from '../../utils/mergeDeep';
import BlockUpdater from './updaters/BlockUpdater';
import TransactionHook from './TransactionHook';
import { updateBlocks } from '../../stores/block/blockActions';
import { BlockUpdate, DecorationUpdate, UpdateBlocks } from '../../stores/block/blockSlice.types';
import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import EditorContextType from '../../setupEditor';

type EditOptions = {
  arrayMergeStrategy?: MergeStrategy;
};

const getDefaultEditOptions = () => ({ arrayMergeStrategy: 'merge' as const });

class Edit {
  constructor(
    blockStore: BlockStore,
    dispatchStore: Store,
    editorContext: EditorContextType,
    systemHooks: TransactionHook[],
    close: () => void,
  ) {
    this.store = blockStore;
    this.systemHooks = systemHooks;
    this.dispatchStore = dispatchStore;
    this.editorContext = editorContext;

    this.close = close;
  }

  flush() {
    this.commitOrFlush(false);
  }

  commit(history?: boolean) {
    this.close();

    this.commitOrFlush(history === false ? false : true);
  }

  create(block: BlockData, options?: EditOptions): this {
    const mergedOptions = this.getMergedOptions(options);
    this.updates.push({ type: 'update', slice: mergedOptions.slice, block });

    return this;
  }

  createDecoration(data: BlockDecorationType, options?: EditOptions): this {
    const mergedOptions = this.getMergedOptions(options);

    this.updates.push({ type: 'update', slice: mergedOptions.slice, decoration: data });

    return this;
  }

  update<T extends BlockCategoryName>(
    id: string,
    block: Partial<BlockData>,
    decorationType: BlockCategoryName,
    decoration: PartialDeep<BlockDecorations[T]>,
  ) {
    this.updateBlock(id, block);
    this.updateDecoration(decorationType, id, decoration);

    return this;
  }

  updateBlock(id: string, update: PartialDeep<BlockData>, options?: EditOptions): this {
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

  updateDecoration<T extends BlockCategoryName>(
    category: T,
    id: string,
    partial: PartialDeep<BlockDecorations[T], object>,
    options?: EditOptions,
  ): this {
    if (this.isRemoved(id)) {
      return this;
    }

    const mergedOptions = this.getMergedOptions(options);

    const origDecoration = this.store.getDecorator(category, id);
    const [prevUpdate, index] = this.getDecorationFromUpdates(id);
    const prevDecoration = prevUpdate?.decoration as BlockDecorations[T];

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

  select(block: BlockData[], options?: EditOptions): this {
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
    let lastUpdateWithBlock: { block: BlockData } | undefined = undefined;

    for (let i = this.updates.length - 1; i >= 0; i--) {
      if ('block' in this.updates[i]) {
        lastUpdateWithBlock = this.updates[i] as { block: BlockData };
        break;
      }
    }

    return Boolean(lastUpdateWithBlock?.block);
  }

  getLastBlock() {
    let lastUpdateWithBlock: { block: BlockData } | undefined = undefined;

    for (let i = this.updates.length - 1; i >= 0; i--) {
      if ('block' in this.updates[i]) {
        lastUpdateWithBlock = this.updates[i] as { block: BlockData };
        break;
      }
    }

    const block = lastUpdateWithBlock?.block;

    if (!block) {
      throw new Error('Block not found in updates');
    }

    return block;
  }

  private mergeBlocks(orig: BlockData, update: PartialDeep<BlockData>, options: EditOptions = getDefaultEditOptions()) {
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

  private getDecorationFromUpdates(id: string): [DecorationUpdate | undefined, number] {
    const index = this.updates.findIndex((update) => ('decoration' in update ? update.decoration.id === id : false));

    if (index === -1) {
      return [undefined, -1];
    }

    return [this.updates[index] as DecorationUpdate | undefined, index];
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

  private systemHooks: TransactionHook[];

  private store: BlockStore;

  private dispatchStore: Store;

  private editorContext: EditorContextType;

  private close: () => void;
}

export default Edit;
