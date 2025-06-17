import BlockStore from '../../stores/block/BlockStore';
import BlockData from '../../models/block/BlockData';
import { BlockCategoryName } from '../../models/block/BlockCategoryName';

class CableHelper {
  constructor(blockStore: BlockStore) {
    this.blockStore = blockStore;
  }

  findClosestWithCategory(block: BlockData, targetCategory: BlockCategoryName) {
    for (const connection of block.multiParentConnections) {
      const neighbor = this.blockStore.getBlock(connection.block);
      if (neighbor.category === targetCategory) {
        return neighbor;
      }
      this.findClosestWithCategory(neighbor, targetCategory);
    }

    return undefined;

    // block.conduitConnections.forEach((connection) => {

    // })

    // const edgeConnection = block.conduitConnections[edgeIndex];

    // if (!edgeConnection) {
    //   return undefined;
    // }

    // const cable = this.blockStore.getBlock(edgeConnection.block);

    // if (cable.category !== 'cables') {
    //   throw new Error(`Precondition failed: category ${cable.category} is not a cable`);
    // }

    // const siblingConnection =
    //   cable.multiParentConnections[0].block === block.id
    //     ? cable.multiParentConnections[1]
    //     : cable.multiParentConnections[0];

    // return this.blockStore.getBlock(siblingConnection.block);
  }

  private blockStore: BlockStore;
}

export default CableHelper;
