import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import BlockData from '../../models/block/BlockData';
import Num3 from '../../models/math/Num3';
import { ConnectCable, ConnectCableFactory } from '../../services/CableConnector';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import SceneStore from '../../ui/scene/SceneStore';
import SceneService from '../../ui/scene/service/SceneService';
import ConnectLowWires from './ConnectLowWires';
import ConnectMainWires from './ConnectMainWires';

class ConnectPole implements ConnectCable {
  category = 'poles' as BlockCategoryName;

  constructor(
    from: BlockData,
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.connectLowWires = new ConnectLowWires(
      from,
      blockStore,
      factoryService,
      sceneService,
      sceneStore,
      transactionService,
    );
    this.connectMainWires = new ConnectMainWires(from, blockStore, factoryService, sceneStore, transactionService);

    this.currentConnection = this.connectMainWires;
  }

  cancel() {
    this.currentConnection.cancel();
  }

  finalize(): void {
    this.currentConnection.finalize();
  }

  meshRendered(): void {
    this.currentConnection.meshRendered();
  }

  update(candidates: BlockData[], fallbackPos: Num3) {
    let newConnection = this.currentConnection;

    if (this.connectLowWires.canConnect(candidates)) {
      newConnection = this.connectLowWires;
    } else if (this.connectMainWires.canConnect(candidates)) {
      newConnection = this.connectMainWires;
    } else {
      newConnection = this.connectMainWires;
    }

    if (newConnection !== this.currentConnection) {
      this.currentConnection.cancel();
      this.currentConnection = newConnection;
    }

    this.currentConnection.update(candidates, fallbackPos);
  }

  private connectLowWires: ConnectLowWires;

  private connectMainWires: ConnectMainWires;

  private currentConnection: ConnectCable;
}

export class ConnectPoleFactory implements ConnectCableFactory {
  category: BlockCategoryName = 'poles';

  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.sceneService = sceneService;
    this.sceneStore = sceneStore;
    this.transactionService = transactionService;
  }

  getConnector(from: BlockData): ConnectCable {
    return new ConnectPole(
      from,
      this.blockStore,
      this.factoryService,
      this.sceneService,
      this.sceneStore,
      this.transactionService,
    );
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;

  private sceneService: SceneService;

  private transactionService: TransactionService;
}

export default ConnectPole;
