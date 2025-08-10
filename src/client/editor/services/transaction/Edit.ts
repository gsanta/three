import {
  BlockDecoratorType,
  BlockDecoratorName,
  BlockDecorators,
  isCoreDecorator,
} from '@/client/editor/models/block/BlockDecoration';
import { PartialDeep } from 'type-fest';
import BlockData, { mergeBlocks } from '@/client/editor/models/block/BlockData';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';
import mergeDeep, { MergeStrategy } from '../../utils/mergeDeep';
import BlockUpdater from './updaters/BlockUpdater';
import { updateBlocks } from '../../stores/block/blockActions';
import { BlockUpdate, DecorationUpdate, UpdateBlocks } from '../../stores/block/blockSlice.types';
import ElectricityStore from '../../stores/electricity/ElectricityStore';
import { isElectricityDecorator } from '../../stores/electricity/Electrics.types';

type EditOptions = {
  arrayMergeStrategy?: MergeStrategy;
};

const getDefaultEditOptions = () => ({ arrayMergeStrategy: 'merge' as const });

class Edit {
  constructor(blockStore: BlockStore, dispatchStore: Store, electricsStore: ElectricityStore, close: () => void) {
    this.blockStore = blockStore;
    this.electricsStore = electricsStore;
    this.dispatchStore = dispatchStore;

    this.close = close;
  }

  commit(props: { history?: boolean } = { history: false }) {
    this.close();

    this.commitOrFlush(props);
  }

  create(block: BlockData): this {
    this.updates.push({ type: 'update', block });

    return this;
  }

  createDecoration(data: BlockDecoratorType): this {
    this.updates.push({ type: 'update', decoration: data });

    return this;
  }

  update<T extends BlockDecoratorName>(
    id: string,
    block: Partial<BlockData>,
    decoration: {
      type: T;
      data: PartialDeep<BlockDecorators[T]>;
    },
  ) {
    this.updateBlock(id, block);
    this.updateDecoration(decoration.type, id, decoration.data);

    return this;
  }

  updateBlock(id: string, update: PartialDeep<BlockData>, options?: EditOptions): this {
    if (this.isRemoved(id)) {
      return this;
    }

    const origBlock = this.blockStore.getBlocks()[id];
    const [prevUpdate, index] = this.getBlockFromUpdates(id);

    const newBlock = this.mergeBlocks(prevUpdate?.block || origBlock, update, options);

    if (index !== -1) {
      this.updates.splice(index, 1);
    }

    this.updates.push({ type: 'update', block: newBlock });

    return this;
  }

  updateDecoration<T extends BlockDecoratorName>(
    decoratorName: T,
    id: string,
    partial: PartialDeep<BlockDecorators[T]>,
    options?: EditOptions,
  ): this {
    if (this.isRemoved(id)) {
      return this;
    }

    const mergedOptions = this.getMergedOptions(options);

    let origDecorator: BlockDecoratorType | undefined;

    if (isElectricityDecorator(decoratorName)) {
      origDecorator = this.electricsStore.getDecorator(decoratorName, id) as BlockDecoratorType;
    } else if (isCoreDecorator(decoratorName)) {
      origDecorator = this.blockStore.getDecorator(decoratorName, id);
    }

    const [prevUpdate, index] = this.getDecorationFromUpdates(id);
    const prevDecoration = prevUpdate?.decoration as BlockDecorators[T];

    const updated = mergeDeep(prevDecoration || origDecorator, partial, mergedOptions.arrayMergeStrategy);

    if (index !== -1) {
      this.updates.splice(index, 1);
    }

    this.updates.push({ type: 'update', decoration: updated as BlockDecoratorType });

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

    this.updates.push({ remove: this.blockStore.getBlocks()[id] });

    return this;
  }

  select(block: BlockData[]): this {
    this.updates.push({ select: block });

    return this;
  }

  hover(id: string | null, partIndex?: string): this {
    this.updates.push({ hover: id, partIndex });

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

  getUpdates() {
    return this.updates;
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

  private commitOrFlush({ history }: { history?: boolean } = { history: false }) {
    if (!this.updates.length) {
      return;
    }

    this.updates.forEach((update) => {
      if ('type' in update && update.type === 'update' && 'decoration' in update) {
        const block = this.blockStore.getBlock(update.decoration.id);
        this.updaters[block?.category]?.onUpdateDecorators(this, block, update.decoration);
      }
    });

    this.dispatchStore.dispatch(updateBlocks({ blockUpdates: this.updates, history }));

    this.updates = [];
  }

  private updates: UpdateBlocks['blockUpdates'] = [];

  private updaters: Record<string, BlockUpdater> = {};

  private blockStore: BlockStore;

  private electricsStore: ElectricityStore;

  private dispatchStore: Store;

  private close: () => void;
}

export default Edit;
