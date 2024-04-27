import undoable, { StateWithHistory } from 'redux-undo';
import blockSettingsSlice, { BlockSettingsState } from '../../editor/features/block/blockSettingsSlice';
import blocksSlice, { BlocksState } from '../../editor/services/scene/blocksSlice';
import settingsSlice, { SettingsState } from '../../editor/features/settings/state/settingsSlice';
import toolSlice, { ToolState } from '../../editor/services/tool/state/toolSlice';
import userSlice, { UserState } from '../../user/userSlice';
import { EnhancedStore, configureStore } from '@reduxjs/toolkit';

const blockSettingsSliceUndoable = undoable(blockSettingsSlice, { filter: () => false });
const sceneSliceUndoable = undoable(blocksSlice);

export type RootState = {
  settings: SettingsState;
  tool: ToolState;
  user: UserState;
  blockSettings: StateWithHistory<BlockSettingsState>;
  blocks: StateWithHistory<BlocksState>;
};

export function setupStore(preloadedState?: RootState): EnhancedStore<RootState> {
  const store = configureStore({
    reducer: {
      settings: settingsSlice,
      tool: toolSlice,
      user: userSlice,
      blockSettings: blockSettingsSliceUndoable,
      blocks: sceneSliceUndoable,
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
  blocks: BlocksState;
  blockSettings: BlockSettingsState;
};
