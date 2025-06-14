import { store } from '@/client/common/utils/store';
import BlockStore from '../stores/block/BlockStore';
import { setCurrentActionPanel } from '../stores/blockCategory/blockCategorySlice';
import DrawUndergroundCable from '../use_cases/cable/DrawUndergroundCable';
import FactoryService from './factory/FactoryService';
import TransactionService from './transaction/TransactionService';
import GridStore from '../stores/grid/GridStore';
import SceneStore from '../ui/scene/SceneStore';
import BlockData from '../models/block/BlockData';
import DrawCableFromCable from '../use_cases/cable/DrawCableFromCable';
import ConnectPole from '../use_cases/connecting/ConnectPole';
import SceneService from '../ui/scene/service/SceneService';

class CableDrawingService {
  constructor(
    block: BlockStore,
    factoryService: FactoryService,
    gridStore: GridStore,
    sceneService: SceneService,
    sceneStore: SceneStore,
    transaction: TransactionService,
  ) {
    this.gridStore = gridStore;

    this.drawCableFromCable = new DrawCableFromCable(block, factoryService, gridStore, sceneStore, transaction);

    this.drawUndergroundCable = new DrawUndergroundCable(block, factoryService, gridStore, sceneStore, transaction);

    this.connectPole = new ConnectPole(block, factoryService, gridStore, sceneService, sceneStore, transaction);
  }

  cancel() {
    this._isDrawing = false;

    this.activeDrawing?.cancel();
    this.activeDrawing = undefined;
    store.dispatch(setCurrentActionPanel('add'));
  }

  finish() {
    this._isDrawing = false;

    this.activeDrawing?.finalize();
    this.activeDrawing = undefined;
    store.dispatch(setCurrentActionPanel('add'));
  }

  isDrawing() {
    return this._isDrawing;
  }

  start(cable: BlockData, gridIndex: number): boolean {
    const toBlocks = this.gridStore.getBlocksAtGridIndex(gridIndex);

    if (this.drawUndergroundCable.tryStart(toBlocks)) {
      this.drawUndergroundCable.execute(gridIndex);

      this.activeDrawing = this.drawUndergroundCable;

      this._isDrawing = true;
      store.dispatch(setCurrentActionPanel('cable-drawing'));

      return true;
    } else if (this.connectPole.tryStart(toBlocks)) {
      this.connectPole.execute(gridIndex);

      this.activeDrawing = this.connectPole;

      this._isDrawing = true;
      store.dispatch(setCurrentActionPanel('cable-drawing'));
    } else if (this.drawCableFromCable.tryStart(toBlocks)) {
      this.drawCableFromCable.execute(gridIndex);

      this.activeDrawing = this.drawCableFromCable;

      this._isDrawing = true;
      store.dispatch(setCurrentActionPanel('cable-drawing'));

      return true;
    }

    return false;
  }

  udpate(gridIndex: number) {
    this.activeDrawing?.execute(gridIndex);
  }

  private _isDrawing = false;

  private drawUndergroundCable: DrawUndergroundCable;

  private drawCableFromCable: DrawCableFromCable;

  private connectPole: ConnectPole;

  private activeDrawing: DrawUndergroundCable | DrawCableFromCable | ConnectPole | undefined;

  private gridStore: GridStore;
}

export default CableDrawingService;
