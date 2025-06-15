import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import BlockData from '../../models/block/BlockData';
import Grid from '../../models/Grid';
import Num3 from '../../models/math/Num3';
import { ConnectCable } from '../../services/CableConnector';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import GridStore from '../../stores/grid/GridStore';
import SceneStore from '../../ui/scene/SceneStore';
import SceneService from '../../ui/scene/service/SceneService';
import ConnectLowWires from './ConnectLowWires';
import ConnectMainWires from './ConnectMainWires';

class ConnectPole {
  category = 'poles' as BlockCategoryName;

  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    gridStore: GridStore,
    sceneService: SceneService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.gridStore = gridStore;

    this.grid = new Grid(gridStore);

    this.connectLowWires = new ConnectLowWires(
      blockStore,
      factoryService,
      sceneService,
      sceneStore,
      transactionService,
    );

    this.connectMainWires = new ConnectMainWires(blockStore, factoryService, sceneStore, transactionService);
  }

  tryStart(candidates: BlockData[]) {
    const pole = candidates.find((candidate) => {
      const category = candidate.category;
      return category === 'poles';
    });

    this.from = pole;

    return this.from !== undefined;
  }

  cancel() {
    this.currentConnection?.cancel();
  }

  finalize(): void {
    this.currentConnection?.finalize();
    this.currentConnection = undefined;
  }

  meshRendered(): void {
    this.currentConnection?.meshRendered();
  }

  execute(gridIndex: number) {
    if (!this.from) {
      throw new Error('Cannot update: no starting pole defined.');
    }

    const candidates = this.gridStore.getBlocksAtGridIndex(gridIndex);
    const [toX, toZ] = this.grid.gridToWorldPos(gridIndex);
    const fallbackPos = [toX, 0, toZ] as Num3;

    let newConnection = this.currentConnection;

    if (this.connectLowWires.canConnect(candidates)) {
      newConnection = this.connectLowWires;
    } else if (this.connectMainWires.canConnect(candidates)) {
      newConnection = this.connectMainWires;
    } else {
      newConnection = this.connectMainWires;
    }

    if (newConnection !== this.currentConnection) {
      this.currentConnection?.cancel();
      this.currentConnection = newConnection;
      this.currentConnection.start(this.from);
    }

    this.currentConnection.update(candidates, fallbackPos);
  }

  private from: BlockData | undefined;

  private connectLowWires: ConnectLowWires;

  private connectMainWires: ConnectMainWires;

  private currentConnection: ConnectCable | undefined;

  private grid: Grid;

  private gridStore: GridStore;
}

export default ConnectPole;
