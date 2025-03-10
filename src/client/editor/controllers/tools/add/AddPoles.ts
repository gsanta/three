import AddBlock from './AddBlock';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import JoinPoles from '@/client/editor/use_cases/block/JoinPoles';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import MathUtils from '@/client/editor/utils/mathUtils';

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
      const otherPoles = this.blockStore
        .getBlocksAsArray()
        .filter((block) => block.category === 'poles')
        .filter((pole) => pole.id !== fromPole.id);

      const toPole = otherPoles.reduce(
        (closest, next) => {
          const newDistance = MathUtils.distance(fromPole.position, next.position);
          if (closest.distance === -1 || closest.distance > newDistance) {
            return {
              poleId: next.id,
              distance: newDistance,
            };
          }

          return closest;
        },
        {
          poleId: '',
          distance: -1,
        },
      );

      if (toPole.poleId) {
        this.joinPoles.join(fromPole, this.blockStore.getBlock(toPole.poleId), [
          ['#2', '#2'],
          ['#3', '#3'],
          ['#4', '#4'],
        ]);
      }
    }

    return edit;
  }

  private blockStore: BlockStore;

  private joinPoles: JoinPoles;

  private factoryService: FactoryService;

  private updateService: TransactionService;
}

export default AddPoles;
