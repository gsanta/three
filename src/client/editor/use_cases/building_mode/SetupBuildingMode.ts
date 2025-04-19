import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import Block from '../../models/Block';

enum Orientation {
  SOUTH = 0,
  NORTH = 180,
  EAST = 90,
  WEST = 270,
}

class SetupBuildingMode {
  constructor(blockStore: BlockStore, update: TransactionService) {
    this.blockStore = blockStore;
    this.update = update;
  }

  setup(building: Block) {
    const edit = this.update.createTransaction();
    const roofs = this.blockStore.filterDescendants(building.id, { category: 'roofs' });

    [Orientation.SOUTH, Orientation.EAST].forEach((orientation) => {
      const walls = this.blockStore.filterParts(building.id, { orientation });

      walls.forEach((wallId) => {
        edit.updateBlock(building.id, {
          partDetails: {
            [wallId]: {
              ...building.partDetails[wallId],
              hide: true,
            },
          },
        });
      });
    });

    roofs.forEach((roof) => {
      edit.updateBlock(roof.id, { isVisible: false });
    });

    edit.commit(false);
  }

  private blockStore: BlockStore;

  private update: TransactionService;
}

export default SetupBuildingMode;
