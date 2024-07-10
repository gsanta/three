import AddBlock from './AddBlock';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import FactoryService from '@/client/editor/services/factory/FactoryService';

class AddBlockToPlain extends AddBlock {
  constructor(factoryService: FactoryService, updateService: TransactionService) {
    super();

    this.factoryService = factoryService;

    this.updateService = updateService;

    this.sourceCategories = ['building-bases', 'roads', 'lamps'];
    this.targetCategories = ['plain'];
  }

  perform({ newBlockType, position }: Parameters<AddBlock['perform']>[0]) {
    const edit = this.updateService.getTransaction();
    this.factoryService.create(edit, newBlockType.type, { position });
    const blockId = edit.getLastBlock().id;
    edit.select(blockId).commit();

    // this.blockId = blockId;
  }

  private factoryService: FactoryService;

  private updateService: TransactionService;
}

export default AddBlockToPlain;
