import BlockFactory from './BlockFactory';
import BlockType from '@/client/editor/models/BlockType';
import BlockCreator from './BlockCreator';
import BaseBlockType from '@/client/editor/models/BaseBlockType';

class DefaultBlockFactory extends BlockFactory {
  create(blockType: BaseBlockType, overrides: Partial<BlockType> = {}) {
    const block = BlockCreator.create(this.sceneService.uuid(blockType), blockType, overrides);

    return block;
  }
}

export default DefaultBlockFactory;
