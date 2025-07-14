import { store } from '@/client/common/utils/store';
import BlockStore from '../stores/block/BlockStore';
import { setCurrentCanvasAction } from '../stores/blockCategory/blockCategorySlice';
import DrawUndergroundCable from '../use_cases/cable/DrawUndergroundCable';
import FactoryService from './factory/FactoryService';
import TransactionService from './transaction/TransactionService';
import GridStore from '../stores/grid/GridStore';
import SceneStore from '../ui/scene/SceneStore';
import BlockData from '../models/block/BlockData';
import DrawCableFromCable from '../use_cases/cable/DrawCableFromCable';
import DrawOverheadCables from '../use_cases/connecting/DrawOverheaderCables';
import SceneService from '../ui/scene/service/SceneService';
import { historyAction } from '../stores/block/blockActions';
import DrawService from '../controllers/tools/DrawService';
import { BlockCategoryName } from '../models/block/BlockCategoryName';

class CableDrawingService implements DrawService {
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

    this.drawOverheadCables = new DrawOverheadCables(
      block,
      factoryService,
      gridStore,
      sceneService,
      sceneStore,
      transaction,
    );
  }

  canHandleCategory(category: BlockCategoryName): boolean {
    return category === 'cables';
  }

  cancel() {
    this._isDrawing = false;

    this.activeDrawing?.cancel();
    this.activeDrawing = undefined;
    store.dispatch(setCurrentCanvasAction('add'));
  }

  finish() {
    this._isDrawing = false;

    this.activeDrawing?.finalize();
    this.activeDrawing = undefined;
    store.dispatch(setCurrentCanvasAction('add'));
    store.dispatch(historyAction());
  }

  isDrawing() {
    return this._isDrawing;
  }

  start(cable: BlockData, gridIndex: number): boolean {
    const toBlocks = this.gridStore.getBlocksAtGridIndex(gridIndex);

    if (this.drawUndergroundCable.tryStart(toBlocks, gridIndex)) {
      this.drawUndergroundCable.execute(gridIndex);

      this.activeDrawing = this.drawUndergroundCable;

      this._isDrawing = true;
      return true;
    } else if (this.drawOverheadCables.tryStart(toBlocks)) {
      this.drawOverheadCables.execute(gridIndex);

      this.activeDrawing = this.drawOverheadCables;

      this._isDrawing = true;
      return true;
    } else if (this.drawCableFromCable.tryStart(toBlocks, gridIndex)) {
      this.drawCableFromCable.execute(gridIndex);

      this.activeDrawing = this.drawCableFromCable;

      this._isDrawing = true;

      return true;
    }

    return false;
  }

  udpate(gridIndex: number) {
    this.activeDrawing?.execute(gridIndex);

    return this.activeDrawing?.getDrawInfo();
  }

  private _isDrawing = false;

  private drawUndergroundCable: DrawUndergroundCable;

  private drawCableFromCable: DrawCableFromCable;

  private drawOverheadCables: DrawOverheadCables;

  private activeDrawing: DrawUndergroundCable | DrawCableFromCable | DrawOverheadCables | undefined;

  private gridStore: GridStore;
}

export default CableDrawingService;
