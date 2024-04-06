import { BlockCategories, BlockCategory } from '@/editor/services/scene/blocksSlice';
import BlockData, { BlockType } from '@/editor/types/BlockData';
import Block from '@/editor/types/Block';
import type { PartialDeep } from 'type-fest';

abstract class BlockFactory<T extends BlockCategory | never = never> {
  readonly type: BlockType;

  constructor(blockData: BlockData) {
    this.type = blockData.data.name;
    this.blockData = blockData;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(options: Partial<Block> = {}): { block: Block; decoration?: BlockCategories[T] } {
    throw new Error('Unimplemented method');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateDecoration(orig: BlockCategories[T], partial: PartialDeep<BlockCategories[T]>): BlockCategories[T] {
    throw new Error('Unimplemented method');
  }

  protected blockData: BlockData;
}

export default BlockFactory;
