import BlockStore from '../../stores/block/BlockStore';
import Block from '../../models/Block';

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
      cable.multiParentConnections[0].block === block.id
        ? cable.multiParentConnections[1]
        : cable.multiParentConnections[0];

    return this.blockStore.getBlock(siblingConnection.block);
  }

  private blockStore: BlockStore;
}

export default CableHelper;
