import { Store } from '@/common/utils/store';
import {
  BlockCategories,
  BlockCategory,
  addMeshes,
  createBlockDecoration,
  updateBlockDecoration,
} from '@/editor/services/scene/blocksSlice';
import BlockFactory from './factory/BlockFactory';
import type { PartialDeep } from 'type-fest';
import PoleFactory from './factory/PoleFactory';
import { getBlock } from '../utils/blockUtils';
import Block from '@/editor/types/Block';

class BlockService {
  constructor(store: Store) {
    this.store = store;
    const blocks = this.store.getState().addBlock.present.blocks;

    this.updaters.poles = new PoleFactory(getBlock(blocks, 'pole'));
  }

  create<T extends BlockCategory>(type: T, options: Partial<Block> = {}) {
    const factory = this.updaters[type];

    if (!factory) {
      throw new Error(`Factory for type ${type} not found`);
    }

    const { block, decoration } = factory.create(options);

    this.store.dispatch(addMeshes([block]));
    if (decoration) {
      this.store.dispatch(createBlockDecoration({ key: type, value: decoration }));
    }
  }

  createDecoration<T extends BlockCategory>(type: T, decoration: BlockCategories[T]) {
    this.store.dispatch(createBlockDecoration({ key: type, value: decoration }));
  }

  updateDecoration<T extends BlockCategory>(type: T, id: string, partial: PartialDeep<BlockCategories[T]>) {
    const orig = this.store.getState().blocks.present.categories[type][id];
    const updated = this.updaters[type]?.updateDecoration(orig, partial);

    if (!updated) {
      throw new Error(`No updater found for type ${type}`);
    }

    this.store.dispatch(updateBlockDecoration({ id: id, key: type, val: updated }));
  }

  private store: Store;

  private updaters: Partial<Record<BlockCategory, BlockFactory<BlockCategory>>> = {};
}

export default BlockService;
