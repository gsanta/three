import BlockCategory from '@/client/editor/types/BlockCategory';
import BlockMover from './BlockMover';
import PoleMover from './PoleMover';
import TransactionService from '../../../services/transaction/TransactionService';
import SceneStore from '../../../components/scene/SceneStore';
import BlockStore from '../../../stores/block/BlockStore';
import Num3 from '@/client/editor/types/Num3';
import BaseMover from './BaseMover';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import { store } from '@/client/common/utils/store';
import { updateSelectTool } from '@/client/editor/stores/tool/toolSlice';

class MoveBlock {
  constructor(blockStore: BlockStore, update: TransactionService, sceneStore: SceneStore, toolStore: ToolStore) {
    this.blockStore = blockStore;
    this.baseMover = new BaseMover(update, sceneStore, toolStore);
    this.update = update;
    this.movers.poles = new PoleMover(blockStore, sceneStore);
    this.sceneStore = sceneStore;
  }

  perform(drag: Num3, dragDelta: Num3) {
    const selectedBlockIds = this.blockStore.getSelectedRootBlockIds();
    const rootBlockId =
      selectedBlockIds.find((blockId) => !this.blockStore.getBlock(blockId).parent) || selectedBlockIds[0];

    const finalDrag = this.baseMover.move(this.blockStore.getBlock(rootBlockId), drag, dragDelta);

    store.dispatch(updateSelectTool({ drag: finalDrag }));

    const edit = this.update.getTransaction();

    selectedBlockIds.forEach((blockId) => {
      const block = this.blockStore.getBlock(blockId);
      const mover = this.movers[block.category];

      if (mover) {
        mover.move(edit, block);
      }
    });

    edit.commit();
  }

  private blockStore: BlockStore;

  private update: TransactionService;

  private movers: Partial<Record<string, BlockMover>> = {};

  private baseMover: BaseMover;

  private sceneStore: SceneStore;
}

export default MoveBlock;
