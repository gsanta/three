import BlockFactory from './BlockFactory';
import Block from '@/editor/types/Block';
import BlockCreator from '../BlockCreator';
import BlockType from '@/editor/types/BlockType';
import BlockCategory, { BlockCategories } from '@/editor/types/BlockCategory';

class DefaultBlockFactory<T extends BlockCategory> extends BlockFactory<T> {
  create(blockType: BlockType, options: Partial<Block> = {}) {
    const block = BlockCreator.create(blockType, options);

    return {
      block,
      decoration: {
        category: block.category,
        id: block.id,
      } as BlockCategories[T],
    };
  }
}

export default DefaultBlockFactory;
