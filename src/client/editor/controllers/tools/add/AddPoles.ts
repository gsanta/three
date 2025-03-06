import AddBlock from './AddBlock';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import JoinPoles from '@/client/editor/use_cases/block/JoinPoles';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import SceneStore from '@/client/editor/components/scene/SceneStore';

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

  perform({ edit, newBlockType, position }: Parameters<AddBlock['perform']>[0]) {
    if (this.fromPole && this.toPole) {
      this.joinPoles.join(this.blockStore.getBlock(this.fromPole), this.blockStore.getBlock(this.toPole), [
        ['#2', '#2'],
        ['#3', '#3'],
        ['#4', '#4'],
      ]);
    }
  }

  private fromPole: string | null = null;

  private toPole: string | null = null;

  private blockStore: BlockStore;

  private joinPoles: JoinPoles;

  private factoryService: FactoryService;

  private updateService: TransactionService;
}

export default AddPoles;
