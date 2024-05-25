import BlockCategory, { BlockCategories } from '@/client/editor/types/BlockCategory';
import BlockFactory from './factories/BlockFactory';
import {
  BlockCreate,
  BlockUpdate,
  DecorationUpdate,
  UpdateBlocks,
  updateBlocks,
} from '@/client/editor/stores/block/blockSlice';
import { PartialDeep } from 'type-fest';
import Block, { BlockSlotSource } from '@/client/editor/types/Block';
import CableFactory from './factories/CableFactory';
import DefaultBlockFactory from './factories/DefaultBlockFactory';
import PoleFactory from './factories/PoleFactory';
import BlockStore from '../../stores/block/BlockStore';
import { Store } from '@/client/common/utils/store';
import BlockUtils from '../../utils/BlockUtils';
import SceneService from '../../components/scene/SceneService';

type MergeStrategies = 'merge' | 'exclude-update';

const mergeArrays = <T>(arr1: T[], arr2: T[] | undefined, mergeStrategy: MergeStrategies) => {
  if (mergeStrategy === 'merge') {
    return [...new Set([...arr1, ...(arr2 || [])])];
  }

  return arr1.filter((id) => !arr2?.includes(id));
};

const mergeSlotSources = (
  arr1: Block['slotSources'],
  arr2: Block['slotSources'] | undefined,
  mergeStrategy: MergeStrategies,
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
  constructor(store: BlockStore, dispatchStore: Store, sceneService: SceneService) {
    this.store = store;
    this.dispatchStore = dispatchStore;

    this.updaters.poles = new PoleFactory(sceneService);
    this.updaters.cables = new CableFactory(sceneService);

    this.defaultFactory = new DefaultBlockFactory(sceneService);
  }

  commit() {
    this.dispatchStore.dispatch(updateBlocks(this.updates));
  }

  create<T extends BlockCategory | never = never>(
    blockName: string,
    options: Partial<Block> = {},
    decorationOptions: Partial<BlockCategories[T]> = {},
  ): this {
    const blocks = this.store.getBlockSettings().blocks;
    const blockType = BlockUtils.getBlock(blocks, blockName);

    const factory = this.updaters[blockType.category as T];

    const { block, decoration } = factory
      ? factory.create(blockType, options, decorationOptions)
      : this.defaultFactory.create(blockType, options);

    this.updates.push({ type: 'create', block, decoration });

    return this;
  }

  update<T extends BlockCategory>(id: string, block: Partial<Block>, decoration: PartialDeep<BlockCategories[T]>) {
    const blocks = this.store.getBlocks();
    const origBlock = blocks[id];
    const category = origBlock.category as T;

    this.updateBlock(id, block);
    this.updateDecoration(category, id, decoration);

    return this;
  }

  updateBlock(
    id: string,
    update: PartialDeep<Block>,
    options: { arrayMergeStrategy: MergeStrategies } = { arrayMergeStrategy: 'merge' },
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

    const prevDecoration = prevUpdate?.decoration;

    if (prevDecoration) {
      this.updates.push({ type: prevUpdate?.type || 'update', block: newBlock, decoration: prevDecoration });
    } else {
      this.updates.push({ type: 'update', block: newBlock });
    }

    return this;
  }

  updateDecoration<T extends BlockCategory>(
    category: T,
    id: string,
    partial: PartialDeep<BlockCategories[T]>,
    options: { mergeArrays: boolean } = { mergeArrays: true },
  ): this {
    if (this.isRemoved(id)) {
      return this;
    }

    const origDecoration = this.store.getDecoration(category, id);
    const [prevUpdate, index] = this.getDecorationFromUpdates(id);

    const updated =
      this.updaters[category]?.updateDecoration(
        (prevUpdate?.decoration as BlockCategories[T]) || origDecoration,
        partial,
        options,
      ) ||
      ({
        category,
        id,
      } as BlockCategories[T]);

    if (index !== -1) {
      this.updates.splice(index, 1);
    }

    const prevBlock = prevUpdate?.block;
    if (prevBlock) {
      this.updates.push({ type: prevUpdate?.type || 'update', block: prevBlock, decoration: updated });
    } else {
      this.updates.push({ type: 'update', decoration: updated });
    }

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

  select(id: string | null, partName?: string): this {
    this.updates.push({ select: id, partName });

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
    options: { arrayMergeStrategy: MergeStrategies } = { arrayMergeStrategy: 'merge' },
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

  private getBlockFromUpdates(
    id: string,
  ): [BlockUpdate<BlockCategory> | BlockCreate<BlockCategory> | undefined, number] {
    const index = this.updates.findIndex((update) => ('block' in update ? update.block?.id === id : false));

    if (index === -1) {
      return [undefined, -1];
    }

    return [this.updates[index] as BlockUpdate<BlockCategory> | BlockCreate<BlockCategory> | undefined, index];
  }

  private getDecorationFromUpdates(
    id: string,
  ): [BlockUpdate<BlockCategory> | BlockCreate<BlockCategory> | DecorationUpdate<BlockCategory> | undefined, number] {
    const index = this.updates.findIndex((update) => ('decoration' in update ? update.decoration?.id === id : false));

    if (index === -1) {
      return [undefined, -1];
    }

    return [
      this.updates[index] as
        | BlockUpdate<BlockCategory>
        | BlockCreate<BlockCategory>
        | DecorationUpdate<BlockCategory>
        | undefined,
      index,
    ];
  }

  private isRemoved(id: string) {
    return this.updates.find((update) => ('remove' in update ? update.remove.id === id : false));
  }

  private updates: UpdateBlocks = [];

  private updaters: Partial<{ [K in keyof BlockCategories]: BlockFactory<K> }> = {};

  private defaultFactory: DefaultBlockFactory;

  private store: BlockStore;

  private dispatchStore: Store;
}

export default Edit;
