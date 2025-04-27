import BlockStore from '@/client/editor/stores/block/BlockStore';
import AddBlock from './AddBlock';
import FactoryService from '@/client/editor/services/factory/FactoryService';

class AddBlockToBlock extends AddBlock {
  constructor(blockStore: BlockStore, factoryService: FactoryService) {
    super('add-block-to-block');

    this.blockStore = blockStore;

    this.factoryService = factoryService;
  }

  perform({ edit, newBlockType, position }: Parameters<AddBlock['perform']>[0]) {
    this.factoryService.create(edit, newBlockType.type, { block: { position } });
    edit.select([edit.getLastBlock()]);

    return edit;
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;
}

export default AddBlockToBlock;
