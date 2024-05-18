import Block from '../types/Block';
import BlockType from '../types/BlockType';

class BlockUtils {
  static iterateDescendents(blocks: Record<string, Block>, block: Block, doWork: (descendantId: Block) => void) {
    doWork(block);

    block.children.forEach((childId) => {
      doWork(blocks[childId]);

      BlockUtils.iterateDescendents(blocks, blocks[childId], doWork);
    });
  }

  static getBlock(blocks: BlockType[], blockName: string) {
    const block = blocks.find((b) => b.name === blockName);

    if (!block) {
      throw new Error('Block not found: ' + blockName);
    }

    return block;
  }
}

export default BlockUtils;
