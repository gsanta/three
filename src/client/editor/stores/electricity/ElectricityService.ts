import BlockData from '../../models/block/BlockData';
import BlockModel from '../../models/block/BlockModel';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../block/BlockStore';

class ElectricityService {
  constructor(blockStore: BlockStore, transactionService: TransactionService) {
    this.blockStore = blockStore;
  }

  makeElectricConnection(electricDevice: BlockModel) {
    if (electricDevice.isCable()) {
      electricDevice.getLeftConnector();
    }
  }

  private getNeighborElectricNodes(block: BlockData): BlockData[] {
    const conduitConnectionBlocks = block.conduitConnections.map((connection) => connection.block);
  }

  private blockStore: BlockStore;
}

export default ElectricityService;
