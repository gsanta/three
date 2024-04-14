import BlockFactory from './BlockFactory';
import Block from '@/editor/types/Block';
import BlockCreator from '../BlockCreator';
import BlockType from '@/editor/types/BlockType';

class DefaultBlockFactory extends BlockFactory {
  create(blockType: BlockType, options: Partial<Block> = {}) {
    const block = BlockCreator.create(blockType, options);

    return {
      block,
    };
  }
}

export default DefaultBlockFactory;
