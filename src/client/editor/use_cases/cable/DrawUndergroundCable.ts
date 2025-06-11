import BlockPart from '../../models/block/part/BlockPart';
import Grid from '../../models/Grid';
import Vector from '../../models/math/Vector';
import MeshWrapper from '../../models/MeshWrapper';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import GridStore from '../../stores/grid/GridStore';
import SceneStore from '../../ui/scene/SceneStore';
import DrawOrUpdateCable from './DrawOrUpdateCable';

class DrawUndergroundCable {
  constructor(
    fromGridIndex: number,
    blockStore: BlockStore,
    factoryService: FactoryService,
    gridStore: GridStore,
    sceneStore: SceneStore,
    transaction: TransactionService,
  ) {
    this.fromGridIndex = fromGridIndex;
    this.blockStore = blockStore;
    this.transaction = transaction;
    this.factoryService = factoryService;
    this.sceneStore = sceneStore;

    this.drawOrUpdateCable = new DrawOrUpdateCable(blockStore, factoryService, transaction);

    this.grid = new Grid(gridStore);
  }

  execute(toGridIndex: number) {
    const [fromX, fromZ] = this.grid.gridToWorldPos(this.fromGridIndex);
    const from = new Vector([fromX, this.undergroundDepth, fromZ]);

    const [toX, toZ] = this.grid.gridToWorldPos(toGridIndex);
    const to = new Vector([toX, this.undergroundDepth, toZ]);

    this.drawOrUpdateCable.updateOrCreate(from.get(), to.get());
  }

  drawToPin(part: BlockPart) {
    const [fromX, fromZ] = this.grid.gridToWorldPos(this.fromGridIndex);
    const from = new Vector([fromX, this.undergroundDepth, fromZ]);

    const mesh = this.sceneStore.getObj3d(part.getBlock().getId());
    const meshWrapper = new MeshWrapper(mesh);
    const to = meshWrapper.findByName(part.getPart().name).getWorldPosition();

    this.drawOrUpdateCable.updateOrCreate(from.get(), to.get());
  }

  cancel() {
    this.drawOrUpdateCable.cancel();
  }

  private fromGridIndex: number;

  private drawOrUpdateCable: DrawOrUpdateCable;

  private grid: Grid;

  private tempCableId?: string;

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;

  private transaction: TransactionService;

  private undergroundDepth = -1;
}

export default DrawUndergroundCable;
