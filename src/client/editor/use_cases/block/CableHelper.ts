import BlockStore from '../../stores/block/BlockStore';
import Block from '../../types/Block';

class CableHelper {
  constructor(blockStore: BlockStore) {
    this.blockStore = blockStore;
  }

  getSibling(block: Block, edgeIndex: number) {
    const edgeConnection = block.conduitConnections[edgeIndex];

    if (!edgeConnection) {
      return undefined;
    }

    const cable = this.blockStore.getBlock(edgeConnection.block);

    if (cable.category !== 'cables') {
      throw new Error(`Precondition failed: category ${cable.category} is not a cable`);
    }

    const siblingConnection =
      cable.conduitParentConnections[0].block === block.id
        ? cable.conduitParentConnections[1]
        : cable.conduitParentConnections[0];

    return this.blockStore.getBlock(siblingConnection.block);
  }

  private blockStore: BlockStore;
}

export default CableHelper;
