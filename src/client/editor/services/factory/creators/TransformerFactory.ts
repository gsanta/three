import Transformer from '@/client/editor/types/block/Transformer';
import BlockFactory from './BlockFactory';
import Block from '@/client/editor/types/Block';

class TransformerFactory extends BlockFactory {
  createCategory(block: Block): Transformer {
    const pole: Transformer = {
      id: block.id,
      category: 'transformers',
    };
    return pole;
  }
}

export default TransformerFactory;
