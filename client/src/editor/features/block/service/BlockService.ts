import { Store } from '@/common/utils/store';
import { addMeshes, createBlockDecoration, updateBlockDecoration } from '@/editor/services/scene/blocksSlice';
import BlockFactory from './factory/BlockFactory';
import type { PartialDeep } from 'type-fest';
import PoleFactory from './factory/PoleFactory';
import Block from '@/editor/types/Block';
import DefaultBlockFactory from './factory/DefaultBlockFactory';
import BlockCategory, { BlockCategories } from '@/editor/types/BlockCategory';
import BlockType from '@/editor/types/BlockType';

class BlockService {
  constructor(store: Store) {
    this.store = store;
    this.updaters.poles = new PoleFactory('poles');
    this.updaters.decorations = new DefaultBlockFactory('decorations');
    this.updaters.walls = new DefaultBlockFactory('walls');
  }

  create(blockType: BlockType, options: Partial<Block> = {}) {
    const factory = this.updaters[blockType.category];

    if (!factory) {
      throw new Error(`Factory for type ${blockType.category} not found`);
    }

    const { block, decoration } = factory.create(blockType, options);

    this.store.dispatch(addMeshes([block]));
    if (decoration) {
      this.store.dispatch(createBlockDecoration({ key: blockType.category, value: decoration }));
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
