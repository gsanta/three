import undoable, { StateWithHistory } from 'redux-undo';
import templateSlice, { BlockSettingsState } from '../../editor/stores/template/templateSlice';
import blockSlice, { BlockState } from '../../editor/stores/block/blockSlice';
import settingsSlice, { SettingsState } from '../../editor/stores/settingsSlice';
import toolSlice, { ToolState } from '../../editor/stores/tool/toolSlice';
import { EnhancedStore, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

const blockSettingsSliceUndoable = undoable(templateSlice, { filter: () => false });
const sceneSliceUndoable = undoable(blockSlice);

export type RootState = {
  settings: SettingsState;
  tool: ToolState;
  template: StateWithHistory<BlockSettingsState>;
  block: StateWithHistory<BlockState>;
};

export const testMiddleware = createListenerMiddleware();

export function setupStore(preloadedState?: RootState): EnhancedStore<RootState> {
  const store = configureStore({
    reducer: {
      settings: settingsSlice,
      tool: toolSlice,
      template: blockSettingsSliceUndoable,
      block: sceneSliceUndoable,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(testMiddleware.middleware),

    preloadedState,
  });

  return store;
}

export type Store = ReturnType<typeof setupStore>;

export type AppDispatch = typeof store.dispatch;

export const store = setupStore();

export type PreloadedState = Omit<RootState, 'blocks' | 'blockSettings'> & {
  blocks: BlockState;
  blockSettings: BlockSettingsState;
};
