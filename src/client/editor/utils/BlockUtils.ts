import BlockData from '../data/BlockData';
import BlockConstantData from '../data/BlockConstantData';

class BlockUtils {
  static getBlock(blocks: BlockConstantData[], blockName: string) {
    const block = blocks.find((b) => b.type === blockName);

    if (!block) {
      throw new Error('Block not found: ' + blockName);
    }

    return block;
  }

  static getPartIndexByName(block: BlockData, partName?: string) {
    return Object.keys(block.partDetails).find((partIndex) => block.partDetails[partIndex]?.name === partName);
  }
}

export default BlockUtils;
