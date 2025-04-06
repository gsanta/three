import AddBlock from './AddBlock';
import FactoryService from '@/client/editor/services/factory/FactoryService';

class AddBlockToBlock extends AddBlock {
  constructor(factoryService: FactoryService) {
    super('add-block-to-block');

    this.factoryService = factoryService;
  }

  perform({ edit, newBlockType, position }: Parameters<AddBlock['perform']>[0]) {
    this.factoryService.create(edit, newBlockType.type, { block: { position } });
    const blockId = edit.getLastBlock().id;
    edit.select(blockId);

    return edit;
  }

  private factoryService: FactoryService;
}

export default AddBlockToBlock;
