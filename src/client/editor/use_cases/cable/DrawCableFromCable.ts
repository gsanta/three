import BlockData from '../../models/block/BlockData';
import CableDecorator from '../../models/block/categories/CableDecorator';
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

class DrawCableFromCable {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    gridStore: GridStore,
    sceneStore: SceneStore,
    transaction: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.sceneStore = sceneStore;

    this.drawOrUpdateCable = new DrawOrUpdateCable(blockStore, factoryService, transaction);

    this.grid = new Grid(gridStore);
  }

  tryStart(candidates: BlockData[]) {
    const cable = candidates.find((candidate) => {
      const category = candidate.category;
      return category === 'cables';
    });

    this.from = cable;

    return this.from !== undefined;
  }

  execute(toGridIndex: number) {
    const [toX, toZ] = this.grid.gridToWorldPos(toGridIndex);
    const to = new Vector([toX, this.undergroundDepth, toZ]);

    this.drawOrUpdateCable.updateOrCreate(this.getFromPosition().get(), to.get());
  }

  finalize() {
    this.drawOrUpdateCable.finalize();
    this.from = undefined;
  }

  drawToPin(part: BlockPart) {
    const mesh = this.sceneStore.getObj3d(part.getBlock().getId());
    const meshWrapper = new MeshWrapper(mesh);
    const to = meshWrapper.findByName(part.getPart().name).getWorldPosition();

    this.drawOrUpdateCable.updateOrCreate(this.getFromPosition().get(), to.get());
  }

  cancel() {
    this.drawOrUpdateCable.cancel();
  }

  private getFromPosition() {
    if (!this.from) {
      throw new Error('Cable from block is not set');
    }

    if (!this.fromPosition) {
      const cable = this.blockStore.getDecorator('cables', this.from.id) as CableDecorator;

      this.fromPosition = new Vector(cable.points[1].position);
    }

    return this.fromPosition;
  }

  private fromPosition: Vector | undefined;

  private from: BlockData | undefined;

  private drawOrUpdateCable: DrawOrUpdateCable;

  private grid: Grid;

  private blockStore: BlockStore;

  private sceneStore: SceneStore;

  private undergroundDepth = -1;
}

export default DrawCableFromCable;
