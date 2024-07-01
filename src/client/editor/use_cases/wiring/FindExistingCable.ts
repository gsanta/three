import BlockStore from '../../stores/block/BlockStore';

class FindExistingCable {
  constructor(blockStore: BlockStore) {
    this.blockStore = blockStore;
  }

  find(targetBlockId: string) {
    const buildingBlock = this.blockStore.getRoot(targetBlockId, 'building-bases');

    const cables = this.blockStore.getDescendants(buildingBlock.id, 'cables');

    const targetBlock = this.blockStore.getBlock(targetBlockId);

    // if (targetBlock.)
  }

  private blockStore: BlockStore;
}

export default FindExistingCable;
