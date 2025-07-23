import BlockData from '../../models/block/BlockData';
import TransactionService from '../../services/transaction/TransactionService';
import ElectricityPathFinder from './ElectricityPathFinder';
import ElectricityStore from './ElectricityStore';

class ElectricityService {
  constructor(electricityStore: ElectricityStore, transactionService: TransactionService) {
    this.transactionService = transactionService;

    this.electricityStore = electricityStore;

    this.electricityPathFinder = new ElectricityPathFinder(electricityStore);
  }

  makeElectricConnection(node1: BlockData, node2: BlockData, connection: BlockData) {
    let edit = this.transactionService.getOrCreateActiveTransaction();

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

    edit.commit();

    edit = this.transactionService.createTransaction();

    const supplier = this.electricityPathFinder.find(node1.id, (node) =>
      this.electricityStore.hasDecorator('electric-suppliers', node),
    );

    if (supplier) {
      this.electricityPathFinder.visit(supplier, (node) => {
        edit.updateDecoration('electrics', node, { energized: true });
      });
    }

    edit.commit();
  }

  private updateElectricSystem() {}

  private electricityPathFinder: ElectricityPathFinder;

  private electricityStore: ElectricityStore;

  private transactionService: TransactionService;
}

export default ElectricityService;
