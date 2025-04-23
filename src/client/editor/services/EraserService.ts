import BlockStore from '../stores/block/BlockStore';
import EraseBlock from '../use_cases/erase/EraseBlock';
import TransactionService from './transaction/TransactionService';

class EraserService {
  constructor(block: BlockStore, update: TransactionService) {
    this.eraseBlock = new EraseBlock(block, update);
  }

  erase(block: string) {
    this.eraseBlock.erase([block]);
  }

  private eraseBlock: EraseBlock;
}

export default EraserService;
