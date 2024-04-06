import BlockFactory from './BlockFactory';
import Block from '@/editor/types/Block';
import BlockCreator from '../BlockCreator';

class CableFactory extends BlockFactory {
  create(options: Partial<Block> = {}) {
    const block = BlockCreator.create(this.blockData, options);

    return {
      block,
    };
  }
}

export default CableFactory;
