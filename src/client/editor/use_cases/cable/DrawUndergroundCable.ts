import BlockData from '../../models/block/BlockData';
import Conduit from '../../models/block/categories/Conduit';
import BlockPart from '../../models/block/part/BlockPart';
import Grid from '../../models/Grid';
import Vector from '../../models/math/Vector';
import MeshWrapper from '../../models/MeshWrapper';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import GridStore from '../../stores/grid/GridStore';
import SceneStore from '../../ui/scene/SceneStore';
import DrawCable from './DrawCable';

class DrawUndergroundCable {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    gridStore: GridStore,
    sceneStore: SceneStore,
    transaction: TransactionService,
  ) {
    this.sceneStore = sceneStore;

    this.drawCable = new DrawCable(blockStore, factoryService, sceneStore, transaction);

    this.grid = new Grid(gridStore);
  }

  tryStart(candidates: BlockData[]) {
    const counduit = candidates.find((candidate) => {
      const category = candidate.category;
      return category === 'conduits' && !candidate.partDetails[Conduit.GROUND_CONNECTION_PART_NAME]?.isConnected[0];
    });

    if (counduit) {
      this.from = new BlockPart(counduit, Conduit.GROUND_CONNECTION_PART_NAME);
    }

    return this.from !== undefined;
  }

  execute(toGridIndex: number) {
    const [toX, toZ] = this.grid.gridToWorldPos(toGridIndex);
    const to = new Vector([toX, this.undergroundDepth, toZ]);

    this.drawCable.draw(this.getFromPosition().get(), to.get(), 'ground-cable-1');
  }

  finalize() {
    this.drawCable.finalize();
    this.from = undefined;
  }

  getDrawInfo() {
    return {
      cableIds: [this.drawCable?.getCableId()],
      finishable: Boolean(this.drawCable.getCableId()),
    };
  }

  cancel() {
    this.drawCable.cancel();
  }

  private getFromPosition() {
    if (this.from === undefined) {
      throw new Error('No from position set');
    }

    if (!this.fromPosition) {
      const mesh = this.sceneStore.getObj3d(this.from.getBlock().getId());
      const meshWrapper = new MeshWrapper(mesh);
      const position = meshWrapper.findByName(this.from.getPart().name).getWorldPosition();
      this.fromPosition = position;
    }

    return this.fromPosition;
  }

  private fromPosition: Vector | undefined;

  private from: BlockPart | undefined;

  private drawCable: DrawCable;

  private grid: Grid;

  private sceneStore: SceneStore;

  private undergroundDepth = -1;
}

export default DrawUndergroundCable;
