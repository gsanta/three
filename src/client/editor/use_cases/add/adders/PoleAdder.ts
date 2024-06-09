import BlockStore from '@/client/editor/stores/block/BlockStore';
import BlockAdder from './BlockAdder';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import JoinPoles from '../../block/JoinPoles';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';

class PoleAdder extends BlockAdder {
  constructor(blockStore: BlockStore, factory: FactoryService, scene: SceneStore, update: TransactionService) {
    super('poles');

    this.blockStore = blockStore;
    this.joinPoles = new JoinPoles(blockStore, scene, factory, update);
    this.update = update;
  }

  performAfter(blockId: string) {
    const selectedBlocks = this.blockStore.getSelectedRootBlockIds();

    const selectedPoles = selectedBlocks.filter(
      (currBlockId) => this.blockStore.getBlock(currBlockId).category === 'poles',
    );

    if (selectedPoles.length !== 2) {
      return;
    }

    this.joinPoles.join(this.blockStore.getBlock(selectedBlocks[0]), this.blockStore.getBlock(selectedBlocks[1]), [
      ['#2', '#2'],
      ['#3', '#3'],
      ['#4', '#4'],
    ]);

    this.update.getTransaction().select(null).select(blockId).commit();
  }

  private blockStore: BlockStore;

  private joinPoles: JoinPoles;

  private update: TransactionService;
}

export default PoleAdder;
