import Transformer from '@/client/editor/models/block/Transformer';
import BlockFactory from './BlockFactory';
import BlockType from '@/client/editor/models/BlockType';

class TransformerFactory extends BlockFactory {
  createCategory(block: BlockType): Transformer {
    const pole: Transformer = {
      id: block.id,
      category: 'transformers',
    };
    return pole;
  }
}

export default TransformerFactory;
