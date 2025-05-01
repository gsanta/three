import BlockMover from './BlockMover';
import TransactionService from '../../../services/transaction/TransactionService';
import SceneStore from '../../../ui/scene/SceneStore';
import BlockStore from '../../../stores/block/BlockStore';
import Num3 from '@/client/editor/models/math/Num3';
import BaseMover from './BaseMover';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import { store } from '@/client/common/utils/store';
import { updateSelectTool } from '@/client/editor/stores/tool/toolSlice';
import MoveDecoration from './MoveDecoration';
import BlockDecoration from '@/client/editor/models/block/BlockCategory';
import MoveDevice from './MoveDevice';
import BlockCategoryStore from '@/client/editor/stores/blockCategory/BlockCategoryStore';

class MoveBlock {
  constructor(
    blockStore: BlockStore,
    blockCategoryStore: BlockCategoryStore,
    update: TransactionService,
    sceneStore: SceneStore,
    toolStore: ToolStore,
  ) {
    this.blockStore = blockStore;
    this.blockCategoryStore = blockCategoryStore;
    this.baseMover = new BaseMover(blockStore, update, sceneStore, toolStore);
    this.update = update;
    this.moveDecorationMap.devices = new MoveDevice(blockStore);
    this.sceneStore = sceneStore;
  }

  perform(drag: Num3, dragDelta: Num3) {
    const selectedBlockIds = this.blockCategoryStore.getSelectedRootBlockIds();
    const rootBlockId =
      selectedBlockIds.find((blockId) => !this.blockStore.getBlock(blockId).parentConnection) || selectedBlockIds[0];

    const finalDrag = this.baseMover.move(this.blockStore.getBlock(rootBlockId), drag, dragDelta);

    store.dispatch(updateSelectTool({ drag: finalDrag }));
  }

  performAfterRender() {
    const edit = this.update.createTransaction();

    const selectedBlockIds = this.blockCategoryStore.getSelectedRootBlockIds();

    selectedBlockIds.forEach((blockId) => {
      const block = this.blockStore.getBlock(blockId);
      const mover = this.movers[block.category];

      if (mover) {
        mover.move(edit, block);
      } else {
        // block.decorations.forEach((decoration) => {
        //   if (this.moveDecorationMap[decoration]) {
        //     this.moveDecorationMap[decoration]?.move(edit, blockId, dragDelta);
        //   }
        // });
      }
    });

    edit.commit();
  }

  private blockCategoryStore: BlockCategoryStore;

  private blockStore: BlockStore;

  private update: TransactionService;

  private movers: Partial<Record<string, BlockMover>> = {};

  private moveDecorationMap: Partial<Record<BlockDecoration, MoveDecoration>> = {};

  private baseMover: BaseMover;

  private sceneStore: SceneStore;
}

export default MoveBlock;
