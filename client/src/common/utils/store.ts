import undoable, { StateWithHistory } from 'redux-undo';
import blockSlice, { BlockState } from '../../editor/features/block/blockSlice';
import sceneSlice, { SceneState } from '../../editor/services/scene/sceneSlice';
import settingsSlice, { SettingsState } from '../../editor/features/settings/state/settingsSlice';
import toolSlice, { ToolState } from '../../editor/services/tool/state/toolSlice';
import userSlice, { UserState } from '../../user/userSlice';
import { EnhancedStore, configureStore } from '@reduxjs/toolkit';

const blockSliceUndoable = undoable(blockSlice, { filter: () => false });
const sceneSliceUndoable = undoable(sceneSlice);

export type RootState = {
  settings: SettingsState;
  tool: ToolState;
  user: UserState;
  block: StateWithHistory<BlockState>;
  scene: StateWithHistory<SceneState>;
};

export function setupStore(preloadedState?: RootState): EnhancedStore<RootState> {
  const store = configureStore({
    reducer: {
      settings: settingsSlice,
      tool: toolSlice,
      user: userSlice,
      block: blockSliceUndoable,
      scene: sceneSliceUndoable,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });

  return store;
}

export type Store = ReturnType<typeof setupStore>;

export type AppDispatch = typeof store.dispatch;

export const store = setupStore();

export type PreloadedState = Omit<RootState, 'block' | 'scene'> & {
  block: BlockState;
  scene: SceneState;
};
