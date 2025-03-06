import AddBlock from './AddBlock';
import FactoryService from '@/client/editor/services/factory/FactoryService';

class AddBlockToPlain extends AddBlock {
  constructor(factoryService: FactoryService) {
    super('add-to-plain');

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

export default AddBlockToPlain;
