/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockType from '@/editor/types/BlockType';
import Block from '@/editor/types/Block';
import type { PartialDeep } from 'type-fest';
import BlockCategory, { BlockCategories } from '@/editor/types/BlockCategory';

abstract class BlockFactory<T extends BlockCategory | never = never> {
  readonly category: BlockCategory;

  constructor(category: BlockCategory) {
    this.category = category;
  }

  create(
    blockType: BlockType,
    blockOptions: Partial<Block> = {},
    decorationOptions: Partial<BlockCategories[T]> = {},
  ): { block: Block; decoration?: BlockCategories[T] } {
    throw new Error('Unimplemented method');
  }

  updateDecoration(orig: BlockCategories[T], partial: PartialDeep<BlockCategories[T]>): BlockCategories[T] {
    throw new Error('Unimplemented method');
  }
}

export default BlockFactory;
