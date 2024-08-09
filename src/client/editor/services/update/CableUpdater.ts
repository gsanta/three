import SceneStore from '../../components/scene/SceneStore';
import BlockStore from '../../stores/block/BlockStore';
import Block from '../../types/Block';
import Updater from './Updater';
import TransactionService from '../transaction/TransactionService';
import UpdateWallCable from './UpdateWallCable';
import UpdateDeviceCable from './UpdateDeviceCable';

class CableUpdater implements Updater {
  constructor(blockStore: BlockStore, sceneStore: SceneStore, transactionService: TransactionService) {
    this.blockStore = blockStore;

    this.updateWallCable = new UpdateWallCable(sceneStore, transactionService);

    this.updateDeviceCable = new UpdateDeviceCable(blockStore, sceneStore, transactionService);
  }

  category = 'cable';

  updateDirtyBlock(block: Block): boolean {
    if (block.parentConnection?.block) {
      const parent = this.blockStore.getBlock(block.parentConnection?.block);

      if (parent.category === 'rooms') {
        return this.updateWallCable.update(block, parent, block.parentConnection?.part || '');
      }
    } else {
      this.updateDeviceCable.update(block);
      return true;
    }

    return true;
  }

  private updateWallCable: UpdateWallCable;

  private updateDeviceCable: UpdateDeviceCable;

  private blockStore: BlockStore;
}

export default CableUpdater;
