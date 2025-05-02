import { BlockContextMenuActionName } from '@/common/model_types/BlockContextMenuAction';
import ConnectPoleToBuilding from './tools/add/ConnectPoleToBuilding';
import BlockStore from '../stores/block/BlockStore';

class ContextMenuController {
  constructor(blockStore: BlockStore, connectPoleToBuilding: ConnectPoleToBuilding) {
    this.blockStore = blockStore;

    this.connectPoleToBuilding = connectPoleToBuilding;
  }

  execute(action: BlockContextMenuActionName, contextMenuTarget: string) {
    switch (action) {
      case 'join-electric-system':
        this.connectPoleToBuilding.execute(this.blockStore.getBlock(contextMenuTarget));
        break;
    }
  }

  private connectPoleToBuilding: ConnectPoleToBuilding;

  private blockStore: BlockStore;
}

export default ContextMenuController;
