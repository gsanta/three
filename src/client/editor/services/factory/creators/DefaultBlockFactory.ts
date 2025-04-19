import BlockFactory from './BlockFactory';
import Block from '@/client/editor/models/Block';
import BlockCreator from './BlockCreator';
import BlockType from '@/client/editor/models/BlockType';

class DefaultBlockFactory extends BlockFactory {
  create(blockType: BlockType, overrides: Partial<Block> = {}) {
    const block = BlockCreator.create(this.sceneService.uuid(blockType), blockType, overrides);

    return block;
  }
}

export default DefaultBlockFactory;
