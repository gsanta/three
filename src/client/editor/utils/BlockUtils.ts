import BlockType from '../types/BlockType';
import BaseBlockType from '../models/BaseBlockType';

class BlockUtils {
  static getBlock(blocks: BaseBlockType[], blockName: string) {
    const block = blocks.find((b) => b.type === blockName);

    if (!block) {
      throw new Error('Block not found: ' + blockName);
    }

    return block;
  }

  static getPartIndexByName(block: BlockType, partName?: string) {
    return Object.keys(block.partDetails).find((partIndex) => block.partDetails[partIndex]?.name === partName);
  }
}

export default BlockUtils;
