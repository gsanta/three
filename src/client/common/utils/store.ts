import undoable, { StateWithHistory } from 'redux-undo';
import blockTypeSlice, { BlockTypeState } from '../../editor/stores/blockType/blockTypeSlice';
import blockSlice, { hover } from '../../editor/stores/block/blockSlice';
import gridSlice, { GridState } from '../../editor/stores/grid/gridSlice';
import toolSlice, { ToolState } from '../../editor/stores/tool/toolSlice';
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import temporarySlice, { TemporaryState } from '@/client/editor/stores/block/temporarySlice';
import electricitySlice, { ElectricityState } from '@/client/editor/stores/electricity/electricitySlice';
import { BlockState } from '@/client/editor/stores/block/blockSlice.types';
import blockCategorySlice, { BlockCategoyState } from '@/client/editor/stores/blockCategory/blockCategorySlice';
import gameSlice, { GameState } from '@/client/editor/stores/game/gameSlice';

const blockSliceUndoable = undoable(blockSlice, {
  filter: (action: { payload: { history?: boolean }; type: string }) => {
    return action.type !== hover.type && action.payload?.history !== false;
  },
});

export type RootState = {
  electricSystem: ElectricityState;
  grid: GridState;
  tool: ToolState;
  temporary: TemporaryState;
  block: StateWithHistory<BlockState>;
  blockCategory: BlockCategoyState;
  blockType: BlockTypeState;
  game: GameState;
};

export const testMiddleware = createListenerMiddleware();

export function setupStore(preloadedState?: RootState) {
  const store = configureStore({
    reducer: {
      electricSystem: electricitySlice,
      grid: gridSlice,
      tool: toolSlice,
      blockCategory: blockCategorySlice,
      blockType: blockTypeSlice,
      temporary: temporarySlice,
      block: blockSliceUndoable,
      game: gameSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(testMiddleware.middleware),

    preloadedState,
  });

  return store;
}

export type Store = ReturnType<typeof setupStore>;

export type AppDispatch = typeof store.dispatch;

export const store = setupStore();

export const dispatch: AppDispatch = store.dispatch as AppDispatch;

export type PreloadedState = Omit<RootState, 'blocks' | 'blockSettings'> & {
  blocks: BlockState;
  blockSettings: BlockTypeState;
};
