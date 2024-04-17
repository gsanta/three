import { Store } from '@/common/utils/store';
import BlockCategory from '@/editor/types/BlockCategory';
import BlockMover from './BlockMover';
import Num3 from '@/editor/types/Num3';
import PoleMover from './PoleMover';
import Block from '@/editor/types/Block';
import { updateBlocks } from '@/editor/services/scene/blocksSlice';

class MoveService {
  constructor(store: Store) {
    this.store = store;
    this.movers.poles = new PoleMover(store);
  }

  move(delta: Num3, block: Block) {
    const mover = this.movers[block.category];

    if (mover) {
      const { categories } = this.store.getState().blocks.present;

      const updates = mover.move(delta, block, categories[block.category][block.id]);

      this.store.dispatch(updateBlocks(updates));
    }
  }

  private store: Store;

  private movers: Partial<Record<BlockCategory, BlockMover<BlockCategory>>> = {};
}

export default MoveService;
