import BlockData from '../../models/block/BlockData';
import Num3 from '../../models/math/Num3';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';

export type DrawOrUpdateCableConfig = {
  isPreview: boolean;
};

const initialConfig: Pick<BlockData, 'isPreview'> = {
  isPreview: false,
};

class DrawCable {
  constructor(blockStore: BlockStore, factoryService: FactoryService, transaction: TransactionService) {
    this.blockStore = blockStore;
    this.transaction = transaction;
    this.factoryService = factoryService;

    this.config = { ...initialConfig };
  }

  finalize() {
    this.cableId = undefined;
    this.config = { ...initialConfig };
  }

  draw(from: Num3, to: Num3) {
    const cable = this.cableId && this.blockStore.getBlock(this.cableId);

    const edit = this.transaction.createTransaction();
    if (!cable) {
      const newCable = this.factoryService.create(edit, 'cable-1', {
        block: {
          isPreview: this.config.isPreview,
        },
        decorations: {
          cables: {
            points: [{ position: from }, { position: to }],
          },
        },
      });

      this.cableId = newCable.id;
    } else {
      edit.updateDecoration(
        'cables',
        cable.id,
        {
          points: [{ position: from }, { position: to }],
        },
        { arrayMergeStrategy: 'replace' },
      );

      edit.updateBlock(cable.id, this.config);
    }
    edit.commit();
  }

  updateConfig(update: Pick<BlockData, 'isPreview'>) {
    this.config = { ...this.config, ...update };
  }

  cancel() {
    if (this.cableId) {
      const edit = this.transaction.createTransaction();
      edit.remove(this.cableId);
      edit.commit();
      this.cableId = undefined;
    }
    this.finalize();
  }

  private config: DrawOrUpdateCableConfig;

  private cableId?: string;

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private transaction: TransactionService;
}

export default DrawCable;
