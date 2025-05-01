import SceneStore from '../../ui/scene/SceneStore';
import BlockStore from '../../stores/block/BlockStore';
import BlockData from '../../models/block/BlockData';
import Updater from './Updater';
import TransactionService from '../transaction/TransactionService';
import UpdateDeviceCable from './UpdateDeviceCable';

class CableUpdater implements Updater {
  constructor(blockStore: BlockStore, sceneStore: SceneStore, transactionService: TransactionService) {
    this.updateDeviceCable = new UpdateDeviceCable(blockStore, sceneStore, transactionService);
  }

  category = 'cable';

  updateDirtyBlock(block: BlockData): boolean {
    this.updateDeviceCable.update(block);
    return true;
  }

  private updateDeviceCable: UpdateDeviceCable;
}

export default CableUpdater;
