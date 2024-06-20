import Edit from '@/client/editor/services/update/Edit';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import Num3 from '@/client/editor/types/Num3';

abstract class MoveDecoration {
  constructor(blockStore: BlockStore) {
    this.blockStore = blockStore;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  move(_edit: Edit, _blockId: string, _dragDelta: Num3) {
    throw new Error('Unimplemented method');
  }

  protected blockStore: BlockStore;
}

export default MoveDecoration;
