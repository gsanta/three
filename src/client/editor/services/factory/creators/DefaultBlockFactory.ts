import BlockFactory from './BlockFactory';
import BlockData from '@/client/editor/models/block/BlockData';
import BlockCreator from './BlockCreator';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';

class DefaultBlockFactory extends BlockFactory {
  create(blockType: BlockConstantData, overrides: Partial<BlockData> = {}) {
    const block = BlockCreator.create(this.sceneService.uuid(blockType), blockType, overrides);

    return block;
  }
}

export default DefaultBlockFactory;
