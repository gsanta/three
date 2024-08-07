import SceneStore from '../../components/scene/SceneStore';
import BlockStore from '../../stores/block/BlockStore';
import TransactionService from '../transaction/TransactionService';
import CableUpdater from './CableUpdater';
import Updater from './Updater';

class UpdateService {
  constructor(blockStore: BlockStore, transactionService: TransactionService, sceneStore: SceneStore) {
    this.blockStore = blockStore;

    this.transactionService = transactionService;

    this.updaters.cables = new CableUpdater(blockStore, sceneStore, transactionService);
  }

  updateDirtyBlock(blockId: string) {
    const block = this.blockStore.getBlock(blockId);

    this.updaters[block.category]?.updateDirtyBlock(block);

    const edit = this.transactionService.getTransaction();

    edit.updateBlock(blockId, { isDirty: false });

    edit.commit();
  }

  private blockStore: BlockStore;

  private transactionService: TransactionService;

  private updaters: Record<string, Updater> = {};
}

export default UpdateService;
