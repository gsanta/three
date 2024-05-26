import { Vector3 } from 'three';
import UpdateService from '../../services/update/UpdateService';
import BlockStore from '../../stores/block/BlockStore';
import BlockCategory from '../../types/BlockCategory';
import BlockAdder from './adders/BlockAdder';
import PoleAdder from './adders/PoleAdder';
import SceneStore from '../../components/scene/SceneStore';

class AddBlock {
  constructor(blockStore: BlockStore, sceneStore: SceneStore, updateService: UpdateService) {
    this.blockStore = blockStore;
    this.updateService = updateService;

    this.adders = {
      ['poles']: new PoleAdder(blockStore, sceneStore, updateService),
    };
  }

  perform(pos: Vector3) {
    const { selectedBlockName } = this.blockStore.getBlockSettings();

    if (!selectedBlockName) {
      return;
    }

    const edit = this.updateService.getUpdate().create(selectedBlockName, { position: [pos.x, pos.y, pos.z] });
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

  private updateService: UpdateService;

  private adders: Partial<Record<BlockCategory, BlockAdder>>;

  private blockId?: string;
}

export default AddBlock;
