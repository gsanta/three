/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockType from '@/client/editor/types/BlockType';
import Block from '@/client/editor/types/Block';
import type { PartialDeep } from 'type-fest';
import BlockCategory, { BlockCategories } from '@/client/editor/types/BlockCategory';

abstract class BlockFactory<T extends BlockCategory | never = never> {
  readonly category?: BlockCategory;

  constructor(category?: BlockCategory) {
    this.category = category;
  }

  create(
    blockType: BlockType,
    blockOptions: Partial<Block> = {},
    decorationOptions: Partial<BlockCategories[T]> = {},
  ): { block: Block; decoration?: BlockCategories[T] } {
    throw new Error('Unimplemented method');
  }

  updateDecoration(
    orig: BlockCategories[T],
    partial: PartialDeep<BlockCategories[T]>,
    options: { mergeArrays: boolean } = { mergeArrays: true },
  ): BlockCategories[T] {
    throw new Error('Unimplemented method');
  }
}

export default BlockFactory;
