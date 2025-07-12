import { store } from '@/client/common/utils/store';
import { setReachableGrids } from '../stores/game/gameSlice';
import BlockConstantData from '../models/block/BlockConstantData';
import CalculateReachableGrids from '../use_cases/grid/CalculateReachableGrids';
import GridStore from '../stores/grid/GridStore';
import GameStore from '../stores/game/GameStore';
import BlockStore from '../stores/block/BlockStore';
import ToolName from '../models/tool/ToolName';
import { setSelectedTool } from '../stores/tool/toolSlice';
import { setAddAction } from '../stores/blockType/blockTypeSlice';
import BlockTypeStore from '../stores/blockType/BlockTypeStore';
import DrawService from '../controllers/tools/DrawService';

class BuildService {
  constructor(blockStore: BlockStore, blockTypeStore: BlockTypeStore, gameStore: GameStore, gridStore: GridStore) {
    this.blockStore = blockStore;

    this.blockTypeStore = blockTypeStore;

    this.gameStore = gameStore;

    this.calculateReachableGrids = new CalculateReachableGrids(gridStore);
  }

  cancel() {
    const activeBlockType = this.blockTypeStore.getAddAction()?.blockType;

    if (!activeBlockType) {
      return;
    }

    const activeBlock = this.blockTypeStore.getBlockType(activeBlockType);

    this.drawServices.forEach((service) => {
      if (service.canHandleCategory(activeBlock.category)) {
        service.cancel();
      }
    });
  }

  finish() {
    const activeBlockType = this.blockTypeStore.getAddAction()?.blockType;

    if (!activeBlockType) {
      return;
    }

    const activeBlock = this.blockTypeStore.getBlockType(activeBlockType);

    this.drawServices.forEach((service) => {
      if (service.canHandleCategory(activeBlock.category)) {
        service.finish();
      }
    });
  }

  setBuildBlock(block: BlockConstantData | undefined) {
    if (!block) {
      store.dispatch(setAddAction(undefined));
    } else {
      store.dispatch(setAddAction({ blockType: block.type, cancelable: false, finishable: false }));
    }

    // TODO: put this logic behind an interface
    if (this.gameStore.getGameState() === 'started') {
      const playerId = this.gameStore.getCurrentPlayer();
      const player = this.blockStore.getBlock(playerId);

      const reachableGrids = this.calculateReachableGrids.execute(player);

      store.dispatch(setReachableGrids(reachableGrids));
    }

    if (block?.category === 'cables') {
      store.dispatch(setSelectedTool(ToolName.Cable));
    } else {
      store.dispatch(setSelectedTool(ToolName.Add));
    }
  }

  setDrawServices(drawServices: DrawService[]) {
    this.drawServices = drawServices;
  }

  setIsEditing({ cancelable, finishable }: { cancelable: boolean; finishable: boolean }) {
    const addAction = this.blockTypeStore.getAddAction();
    if (addAction) {
      store.dispatch(setAddAction({ ...addAction, cancelable, finishable }));
    }
  }

  private blockStore: BlockStore;

  private blockTypeStore: BlockTypeStore;

  private calculateReachableGrids: CalculateReachableGrids;

  private drawServices: DrawService[] = [];

  private gameStore: GameStore;
}

export default BuildService;
