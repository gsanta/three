import FactoryService from '@/client/editor/services/factory/FactoryService';
import { AddParams } from './AddToAnchorAsChild';
import DrawCommand from './DrawCommand';
import TransactionService from '@/client/editor/services/transaction/TransactionService';

class AddToPlain implements DrawCommand {
  constructor(factoryService: FactoryService, transactionService: TransactionService) {
    this.factoryService = factoryService;

    this.transactionService = transactionService;
  }

  finish(): void {
    if (this.newBlockId) {
      this.transactionService.createTransaction().updateBlock(this.newBlockId, { isPreview: false }).commit();
    }
    this.newBlockId = undefined;
  }

  execute({ edit, newBlockType, position }: AddParams) {
    if (!position) {
      throw new Error('Position must be provided for adding to plain');
    }

    this.newBlockId = this.factoryService.create(edit, newBlockType.type, {
      block: { isPreview: true, position: position.get() },
    }).id;
  }

  getNewBlockId() {
    return this.newBlockId;
  }

  private newBlockId?: string;

  private factoryService: FactoryService;

  private transactionService: TransactionService;
}

export default AddToPlain;
