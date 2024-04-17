import { Store } from '@/common/utils/store';
import { UpdateBlock } from '@/editor/services/scene/blocksSlice';
import BlockFactory from './factory/BlockFactory';
import type { PartialDeep } from 'type-fest';
import PoleFactory from './factory/PoleFactory';
import Block from '@/editor/types/Block';
import DefaultBlockFactory from './factory/DefaultBlockFactory';
import BlockCategory, { BlockCategories } from '@/editor/types/BlockCategory';
import { BlockName } from '@/editor/types/BlockType';
import CableFactory from './factory/CableFactory';
import { getBlock } from '../utils/blockUtils';

class BlockService {
  constructor(store: Store) {
    this.store = store;
    this.updaters.poles = new PoleFactory('poles');
    this.updaters.decorations = new DefaultBlockFactory('decorations');
    this.updaters.walls = new DefaultBlockFactory('walls');
    this.updaters.cables = new CableFactory();
  }

  create<T extends BlockCategory | never = never>(
    blockName: BlockName,
    options: Partial<Block> = {},
    decorationOptions: Partial<BlockCategories[T]> = {},
  ): UpdateBlock & { block: Block } {
    const { blocks } = this.store.getState().blockSettings.present;
    const blockType = getBlock(blocks, blockName);

    const factory = this.updaters[blockType.category];

    if (!factory) {
      throw new Error(`Factory for type ${blockType.category} not found`);
    }

    const { block, decoration } = factory.create(blockType, options, decorationOptions);

    return {
      block,
      category: blockType.category,
      decoration,
    } as UpdateBlock & { block: Block };
  }

  executeUpdate(updates: UpdateBlock[]): Block {}

  updateBlock(
    id: string,
    update: PartialDeep<Block>,
    { mergeArrays }: { mergeArrays: boolean } = { mergeArrays: true },
  ) {
    const block = this.store.getState().blocks.present.blocks[id];

    const newBlock: Block = {
      ...block,
      ...update,
      dependents: mergeArrays ? [...new Set([...block.dependents, ...(update.dependents || [])])] : update.dependents,
      dependsOn: [...new Set([...block.dependsOn, ...(update.dependsOn || [])])],
      children: [...new Set([...block.children, ...(update.children || [])])],
    } as Block;

    return newBlock;
  }

  updateAssociation<T extends BlockCategory>(
    type: T,
    id: string,
    partial: PartialDeep<BlockCategories[T]>,
  ): BlockCategories[T] {
    const orig = this.store.getState().blocks.present.categories[type][id];
    const updated = this.updaters[type]?.updateDecoration(orig, partial);

    if (!updated) {
      throw new Error(`No updater found for type ${type}`);
    }

    return updated as BlockCategories[T];

    // this.store.dispatch(updateBlockDecoration({ id: id, key: type, val: updated }));
  }

  private store: Store;

  private updaters: Partial<Record<BlockCategory, BlockFactory<BlockCategory>>> = {};
}

export default BlockService;
