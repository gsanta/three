import BlockData from '../../models/block/BlockData';
import TransactionService from '../../services/transaction/TransactionService';

class ElectricityService {
  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  makeElectricConnection(node1: BlockData, node2: BlockData, connection: BlockData) {
    const edit = this.transactionService.getOrCreateActiveTransaction();

    edit.updateBlock(
      connection.id,
      {
        electricNodes: [node1.id, node2.id],
      },
      {
        arrayMergeStrategy: 'replace',
      },
    );

    edit.updateBlock(node1.id, {
      electricEdges: [connection.id],
    });

    edit.updateBlock(node2.id, {
      electricEdges: [connection.id],
    });
  }

  private transactionService: TransactionService;
}

export default ElectricityService;
