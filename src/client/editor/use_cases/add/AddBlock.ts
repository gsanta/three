import { Vector3 } from 'three';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import BlockCategory from '../../types/BlockCategory';
import BlockAdder from './adders/BlockAdder';
import PoleAdder from './adders/PoleAdder';
import SceneStore from '../../components/scene/SceneStore';
import FactoryService from '../../services/factory/FactoryService';

class AddBlock {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.updateService = updateService;

    this.adders = {
      ['poles']: new PoleAdder(blockStore, factoryService, sceneStore, updateService),
    };
  }

  perform(pos: Vector3) {
    const { selectedBlockName } = this.blockStore.getBlockSettings();

    if (!selectedBlockName) {
      return;
    }

    const edit = this.updateService.getUpdate();
    this.factoryService.create(edit, selectedBlockName, { position: [pos.x, pos.y, pos.z] });
    const blockId = edit.getLastBlock().id;
    edit.select(blockId).commit();

    this.blockId = blockId;
  }

  performAfterRender() {
    try {
      if (this.blockId) {
        const block = this.blockStore.getBlock(this.blockId);

        this.adders[block.category]?.performAfter(this.blockId);
      }
    } finally {
      this.blockId = undefined;
    }
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private updateService: TransactionService;

  private adders: Partial<Record<BlockCategory, BlockAdder>>;

  private blockId?: string;
}

export default AddBlock;
