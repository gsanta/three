import { Vector3 } from 'three';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import BlockAdder from './adders/BlockAdder';
import PoleAdder from './adders/PoleAdder';
import SceneStore from '../../components/scene/SceneStore';
import FactoryService from '../../services/factory/FactoryService';
import Edit from '../../services/transaction/Edit';

class AddBlockToPlain {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;

    this.adders = {
      ['poles']: new PoleAdder(blockStore, factoryService, sceneStore, updateService),
    };
  }

  perform(edit: Edit, pos: Vector3, blockType: string) {
    this.factoryService.create(edit, blockType, { block: { position: [pos.x, pos.y, pos.z] } });
    const blockId = edit.getLastBlock().id;
    edit.select(blockId);

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

  private adders: Partial<Record<string, BlockAdder>>;

  private blockId?: string;
}

export default AddBlockToPlain;
