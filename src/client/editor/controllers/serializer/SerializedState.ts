import { BlockState } from '../../stores/block/blockSlice.types';
import { GameState } from '../../stores/game/gameSlice';
import { GridState } from '../../stores/grid/gridSlice';

export type SerializedState = { block: BlockState; game: GameState; grid: GridState };
