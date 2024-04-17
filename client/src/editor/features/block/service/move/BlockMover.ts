/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockType from '@/editor/types/BlockType';
import Block from '@/editor/types/Block';
import type { PartialDeep } from 'type-fest';
import BlockCategory, { BlockCategories } from '@/editor/types/BlockCategory';
import Num3 from '@/editor/types/Num3';
import { UpdateBlock } from '@/editor/services/scene/blocksSlice';

abstract class BlockMover<T extends BlockCategory | never = never> {
  readonly category: BlockCategory;

  constructor(category: BlockCategory) {
    this.category = category;
  }

  move(delta: Num3, block: Block, decoration: Partial<BlockCategories[T]>): UpdateBlock[] {
    throw new Error('Unimplemented method');
  }
}

export default BlockMover;
