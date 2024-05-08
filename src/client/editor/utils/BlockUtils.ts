import Block from '../types/Block';

class BlockUtils {
  static iterateDescendents(blocks: Record<string, Block>, block: Block, doWork: (descendantId: Block) => void) {
    doWork(block);

    block.children.forEach((childId) => {
      doWork(blocks[childId]);

      BlockUtils.iterateDescendents(blocks, blocks[childId], doWork);
    });
  }
}

export default BlockUtils;
