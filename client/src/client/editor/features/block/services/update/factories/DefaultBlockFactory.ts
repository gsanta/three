import BlockFactory from './BlockFactory';
import Block from '@/client/editor/types/Block';
import BlockCreator from './BlockCreator';
import BlockType from '@/client/editor/types/BlockType';
import BlockCategory, { BlockCategories } from '@/client/editor/types/BlockCategory';

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
