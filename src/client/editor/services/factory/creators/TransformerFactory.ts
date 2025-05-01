import Transformer from '@/client/editor/models/block/Transformer';
import BlockFactory from './BlockFactory';
import BlockData from '@/client/editor/data/BlockData';

class TransformerFactory extends BlockFactory {
  createCategory(block: BlockData): Transformer {
    const pole: Transformer = {
      id: block.id,
      category: 'transformers',
    };
    return pole;
  }
}

export default TransformerFactory;
