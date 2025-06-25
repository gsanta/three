import { Store } from '@/client/common/utils/store';
import BlockSerializer from '../../stores/block/BlockSerializer';
import GameSerializer from '../../stores/game/GameSerializer';
import GridSerializer from '../../stores/grid/GridSerializer';
import { SerializedState } from './SerializedState';
import { importAction } from '../../stores/block/blockActions';

class Serializer {
  constructor(
    store: Store,
    blockSerializer: BlockSerializer,
    gameSerializer: GameSerializer,
    gridSerializer: GridSerializer,
  ) {
    this.store = store;

    this.blockSerializer = blockSerializer;
    this.gameSerializer = gameSerializer;
    this.gridSerializer = gridSerializer;
  }

  export(): SerializedState {
    return {
      block: this.blockSerializer.export(),
      game: this.gameSerializer.export(),
      grid: this.gridSerializer.export(),
    };
  }

  import(state: SerializedState): void {
    this.store.dispatch(importAction(state));
  }

  private store: Store;

  private blockSerializer: BlockSerializer;

  private gameSerializer: GameSerializer;

  private gridSerializer: GridSerializer;
}

export default Serializer;
