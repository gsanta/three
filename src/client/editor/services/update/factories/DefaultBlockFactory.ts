import BlockFactory from './BlockFactory';
import Block from '@/client/editor/types/Block';
import BlockCreator from './BlockCreator';
import BlockType from '@/client/editor/types/BlockType';

class DefaultBlockFactory extends BlockFactory {
  create(blockType: BlockType, overrides: Partial<Block> = {}) {
    const block = BlockCreator.create(this.sceneService.uuid(), blockType, overrides);

    return block;
  }
}

export default DefaultBlockFactory;
