import undoable, { StateWithHistory } from 'redux-undo';
import templateSlice, { BlockSettingsState } from '../../editor/stores/template/templateSlice';
import blockSlice, { BlockState, hover } from '../../editor/stores/block/blockSlice';
import settingsSlice, { SettingsState } from '../../editor/stores/settingsSlice';
import toolSlice, { ToolState } from '../../editor/stores/tool/toolSlice';
import { EnhancedStore, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import temporarySlice, { TemporaryState } from '@/client/editor/stores/block/temporarySlice';

const blockSettingsSliceUndoable = undoable(templateSlice, { filter: () => false });
const sceneSliceUndoable = undoable(blockSlice, {
  filter: (action) => {
    return action.type !== hover.type;
  },
});

export type RootState = {
  settings: SettingsState;
  tool: ToolState;
  template: StateWithHistory<BlockSettingsState>;
  temporary: TemporaryState;
  block: StateWithHistory<BlockState>;
};

export const testMiddleware = createListenerMiddleware();

export function setupStore(preloadedState?: RootState): EnhancedStore<RootState> {
  const store = configureStore({
    reducer: {
      settings: settingsSlice,
      tool: toolSlice,
      template: blockSettingsSliceUndoable,
      temporary: temporarySlice,
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