import AddBlockType from './AddBlockType';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import FactoryService from '@/client/editor/services/factory/FactoryService';

class AddBlockToPlain extends AddBlockType {
  constructor(factoryService: FactoryService, updateService: TransactionService) {
    super();

    this.factoryService = factoryService;

    this.updateService = updateService;

    this.sourceCategories = ['building-bases', 'roads', 'lamps'];
    this.targetCategories = ['plain'];
  }

  perform({ edit, newBlockType, position }: Parameters<AddBlockType['perform']>[0]) {
    this.factoryService.create(edit, newBlockType.type, { position });
    const blockId = edit.getLastBlock().id;
    edit.select(blockId);
  }

  private factoryService: FactoryService;

  private updateService: TransactionService;
}

export default AddBlockToPlain;
