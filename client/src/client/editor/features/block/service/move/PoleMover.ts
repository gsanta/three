import Pole from '@/client/editor/services/scene/types/Pole';
import Num3 from '@/client/editor/types/Num3';
import BlockMover from './BlockMover';
import Block from '@/client/editor/types/Block';
import { Store } from '@/client/common/utils/store';
import { addVector } from '@/client/editor/utils/vectorUtils';
import { UpdateBlock } from '@/client/editor/services/scene/blocksSlice';

class PoleMover extends BlockMover<'poles'> {
  constructor(store: Store) {
    super('poles');
    this.store = store;
  }

  move(delta: Num3, pole: Block, decoration: Pole): UpdateBlock[] {
    const ret: UpdateBlock[] = [];

    if (decoration.pins.pin1) {
      ret.push(this.moveCable(delta, decoration.pins.pin1));
    }

    return ret;
  }

  private moveCable(delta: Num3, cableId: string): UpdateBlock {
    const { blocks, categories } = this.store.getState().blocks.present;
    const cable = categories.cables[cableId];

    const newPoints = categories.cables[cableId].points.map((point) => addVector(point, delta));

    return {
      block: blocks[cableId],
      category: 'cables',
      decoration: {
        ...cable,
        points: newPoints,
      },
    };
  }

  private store: Store;
}

export default PoleMover;
