import AddBlock from './AddBlock';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import JoinPoles from '@/client/editor/use_cases/block/JoinPoles';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import SceneStore from '@/client/editor/ui/scene/SceneStore';

class AddPoles extends AddBlock {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    super('add-poles');

    this.blockStore = blockStore;

    this.factoryService = factoryService;

    this.updateService = updateService;

    this.joinPoles = new JoinPoles(blockStore, sceneStore, factoryService, updateService);
  }

  perform({ edit, addContext }: Parameters<AddBlock['perform']>[0]) {
    if (addContext.addedBlockId) {
      const fromPole = this.blockStore.getBlock(addContext.addedBlockId);

      this.joinPoles.join(fromPole);
    }

    return edit;
  }

  private blockStore: BlockStore;

  private joinPoles: JoinPoles;

  private factoryService: FactoryService;

  private updateService: TransactionService;
}

export default AddPoles;
