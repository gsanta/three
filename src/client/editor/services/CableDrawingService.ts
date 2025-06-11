import { store } from '@/client/common/utils/store';
import BlockStore from '../stores/block/BlockStore';
import { setCurrentActionPanel } from '../stores/blockCategory/blockCategorySlice';
import DrawUndergroundCable from '../use_cases/cable/DrawUndergroundCable';
import FactoryService from './factory/FactoryService';
import TransactionService from './transaction/TransactionService';
import GridStore from '../stores/grid/GridStore';
import BlockPart from '../models/block/part/BlockPart';
import SceneStore from '../ui/scene/SceneStore';

class CableDrawingService {
  constructor(
    block: BlockStore,
    factoryService: FactoryService,
    gridStore: GridStore,
    sceneStore: SceneStore,
    transaction: TransactionService,
  ) {
    this.blockStore = block;
    this.transaction = transaction;
    this.factoryService = factoryService;

    this.gridStore = gridStore;
    this.sceneStore = sceneStore;
  }

  cancel() {
    this._isDrawing = false;

    this.drawUndergroundCable?.cancel();
    this.drawUndergroundCable = undefined;
    store.dispatch(setCurrentActionPanel('add'));
  }

  finish() {
    this._isDrawing = false;

    this.drawUndergroundCable = undefined;
    store.dispatch(setCurrentActionPanel('add'));
  }

  isDrawing() {
    return this._isDrawing;
  }

  start(gridIndex: number) {
    this._isDrawing = true;
    store.dispatch(setCurrentActionPanel('cable-drawing'));

    this.drawUndergroundCable = new DrawUndergroundCable(
      gridIndex,
      this.blockStore,
      this.factoryService,
      this.gridStore,
      this.sceneStore,
      this.transaction,
    );
  }

  udpate(gridIndex: number) {
    const blocks = this.gridStore.getBlocksAtGridIndex(gridIndex);

    const transformer = blocks.find((block) => block.category === 'transformers');
    if (transformer) {
      this.drawUndergroundCable?.drawToPin(new BlockPart(transformer, 'Pin1'));
    } else {
      this.drawUndergroundCable?.execute(gridIndex);
    }
  }

  private _isDrawing = false;

  private drawUndergroundCable?: DrawUndergroundCable;

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private gridStore: GridStore;

  private sceneStore: SceneStore;

  private transaction: TransactionService;
}

export default CableDrawingService;
