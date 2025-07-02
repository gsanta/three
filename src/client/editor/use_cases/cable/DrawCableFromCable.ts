import BlockData from '../../models/block/BlockData';
import CableDecorator from '../../models/block/categories/CableDecorator';
import Grid from '../../models/Grid';
import Vector from '../../models/math/Vector';
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

    this.drawCable = new DrawCable(blockStore, factoryService, sceneStore, transaction);

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

    this.drawCable.draw(this.getFromPosition().get(), to.get(), 'ground-cable-1');
  }

  finalize() {
    this.drawCable.finalize();
    this.from = undefined;
    this.fromGridIndex = undefined;
    this.fromPosition = undefined;
  }

  getDrawInfo() {
    return {
      cableIds: this.drawCable.getCableId() ? [this.drawCable.getCableId()] : [],
      finishable: false,
    };
  }

  cancel() {
    this.drawCable.cancel();
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

  private drawCable: DrawCable;

  private grid: Grid;

  private blockStore: BlockStore;

  private undergroundDepth = -1;
}

export default DrawCableFromCable;
