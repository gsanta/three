import Num3 from '../../models/math/Num3';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';

class DrawOrUpdateCable {
  constructor(blockStore: BlockStore, factoryService: FactoryService, transaction: TransactionService) {
    this.blockStore = blockStore;
    this.transaction = transaction;
    this.factoryService = factoryService;
  }

  updateOrCreate(from: Num3, to: Num3) {
    const cable = this.tempCableId && this.blockStore.getBlock(this.tempCableId);

    const edit = this.transaction.createTransaction();
    if (!cable) {
      const newCable = this.factoryService.create(edit, 'cable-1', {
        decorations: {
          cables: {
            points: [{ position: from }, { position: to }],
          },
        },
      });

      this.tempCableId = newCable.id;
    } else {
      edit.updateDecoration(
        'cables',
        cable.id,
        {
          points: [{ position: from }, { position: to }],
        },
        { arrayMergeStrategy: 'replace' },
      );
    }
    edit.commit();
  }

  cancel() {
    if (this.tempCableId) {
      const edit = this.transaction.createTransaction();
      edit.remove(this.tempCableId);
      edit.commit();
      this.tempCableId = undefined;
    }
  }

  private tempCableId?: string;

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private transaction: TransactionService;
}

export default DrawOrUpdateCable;
