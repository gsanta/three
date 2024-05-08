import BlockCategory from '@/client/editor/types/BlockCategory';
import BlockMover from './BlockMover';
import PoleMover from './PoleMover';
import Block from '@/client/editor/types/Block';
import UpdateService from '../../services/update/UpdateService';
import SceneStore from '../../../scene/SceneStore';
import BlockStore from '../../BlockStore';

class MoveService {
  constructor(store: BlockStore, update: UpdateService, scene: SceneStore) {
    this.update = update;
    this.movers.poles = new PoleMover(store, scene);
  }

  move(block: Block) {
    const mover = this.movers[block.category];

    if (mover) {
      const edit = this.update.getUpdate();

      mover.move(edit, block);

      edit.commit();
    }
  }

  private update: UpdateService;

  private movers: Partial<Record<BlockCategory, BlockMover>> = {};
}

export default MoveService;
