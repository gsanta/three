import undoable, { StateWithHistory } from 'redux-undo';
import templateSlice, { BlockSettingsState } from '../../editor/features/template/templateSlice';
import blockSlice, { BlockState } from '../../editor/features/block/blockSlice';
import settingsSlice, { SettingsState } from '../../editor/features/settings/state/settingsSlice';
import toolSlice, { ToolState } from '../../editor/features/tool/toolSlice';
import { EnhancedStore, configureStore } from '@reduxjs/toolkit';

const blockSettingsSliceUndoable = undoable(templateSlice, { filter: () => false });
const sceneSliceUndoable = undoable(blockSlice);

export type RootState = {
  settings: SettingsState;
  tool: ToolState;
  template: StateWithHistory<BlockSettingsState>;
  block: StateWithHistory<BlockState>;
};

export function setupStore(preloadedState?: RootState): EnhancedStore<RootState> {
  const store = configureStore({
    reducer: {
      settings: settingsSlice,
      tool: toolSlice,
      template: blockSettingsSliceUndoable,
      block: sceneSliceUndoable,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
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
