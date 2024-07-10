import AddBlock from './AddBlock';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import JoinPoles from '@/client/editor/use_cases/block/JoinPoles';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import SceneStore from '@/client/editor/components/scene/SceneStore';

class AddPoleBlock extends AddBlock {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    super();

    this.blockStore = blockStore;

    this.factoryService = factoryService;

    this.updateService = updateService;

    this.joinPoles = new JoinPoles(blockStore, sceneStore, factoryService, updateService);

    this.sourceCategories = ['poles'];
    this.targetCategories = ['plain'];
  }

  perform({ newBlockType, position }: Parameters<AddBlock['perform']>[0]) {
    const edit = this.updateService.getTransaction();
    this.factoryService.create(edit, newBlockType.type, { position });
    const blockId = edit.getLastBlock().id;
    edit.select(blockId).commit();

    this.blockId = blockId;
  }

  performAfterRender() {
    if (!this.blockId) {
      return;
    }

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

    this.updateService.getTransaction().select(null).select(this.blockId).commit();
  }

  private blockId?: string;

  private blockStore: BlockStore;

  private joinPoles: JoinPoles;

  private factoryService: FactoryService;

  private updateService: TransactionService;
}

export default AddPoleBlock;
