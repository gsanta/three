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
import DrawCable from './DrawCable';

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

    this.drawOrUpdateCable = new DrawCable(blockStore, factoryService, sceneStore, transaction);

    this.grid = new Grid(gridStore);
  }

  tryStart(candidates: BlockData[], gridIndex: number) {
    this.fromGridIndex = gridIndex;

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

    this.drawOrUpdateCable.draw(this.getFromPosition().get(), to.get(), 'ground-cable-1');
  }

  finalize() {
    this.drawOrUpdateCable.finalize();
    this.from = undefined;
    this.fromGridIndex = undefined;
    this.fromPosition = undefined;
  }

  drawToPin(part: BlockPart) {
    const mesh = this.sceneStore.getObj3d(part.getBlock().getId());
    const meshWrapper = new MeshWrapper(mesh);
    const to = meshWrapper.findByName(part.getPart().name).getWorldPosition();

    this.drawOrUpdateCable.draw(this.getFromPosition().get(), to.get(), 'ground-cable-1');
  }

  cancel() {
    this.drawOrUpdateCable.cancel();
    this.from = undefined;
    this.fromGridIndex = undefined;
    this.fromPosition = undefined;
  }

  private getFromPosition() {
    if (!this.from) {
      throw new Error('Cable from block is not set');
    }

    if (!this.fromPosition) {
      const cable = this.blockStore.getDecorator('cables', this.from.id) as CableDecorator;

      const point1GridIndex = this.grid.worldToGridIndex(new Vector(cable.points[0].position));

      if (point1GridIndex === this.fromGridIndex) {
        this.fromPosition = new Vector(cable.points[0].position);
      } else {
        this.fromPosition = new Vector(cable.points[1].position);
      }
    }

    return this.fromPosition;
  }

  private fromGridIndex: number | undefined;

  private fromPosition: Vector | undefined;

  private from: BlockData | undefined;

  private drawOrUpdateCable: DrawCable;

  private grid: Grid;

  private blockStore: BlockStore;

  private sceneStore: SceneStore;

  private undergroundDepth = -1;
}

export default DrawCableFromCable;
