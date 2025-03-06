import undoable, { StateWithHistory } from 'redux-undo';
import blockTypeSlice, { BlockTypeState } from '../../editor/stores/blockType/blockTypeSlice';
import blockSlice, { hover } from '../../editor/stores/block/blockSlice';
import editorSlice, { EditorState } from '../../editor/stores/editorSlice';
import toolSlice, { ToolState } from '../../editor/stores/tool/toolSlice';
import { EnhancedStore, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import temporarySlice, { TemporaryState } from '@/client/editor/stores/block/temporarySlice';
import electricitySlice, { ElectricityState } from '@/client/editor/stores/electricity/electricitySlice';
import buildingSlice from '@/client/editor/stores/block/buildingSlice';
import { BlockState } from '@/client/editor/stores/block/blockSlice.types';
import blockCategorySlice from '@/client/editor/stores/blockCategory/blockCategorySlice';

const blockSliceUndoable = undoable(blockSlice, {
  filter: (action: { payload: { history?: boolean }; type: string }) => {
    return action.type !== hover.type && action.payload?.history !== false;
  },
});

const buildingSliceUndoable = undoable(buildingSlice, {
  filter: (action: { payload: { history?: boolean }; type: string }) => {
    return action.type !== hover.type && action.payload?.history !== false;
  },
});

export type RootState = {
  building: StateWithHistory<BlockState>;
  electricSystem: ElectricityState;
  editor: EditorState;
  tool: ToolState;
  temporary: TemporaryState;
  block: StateWithHistory<BlockState>;
  blockType: BlockTypeState;
};

export const testMiddleware = createListenerMiddleware();

export function setupStore(preloadedState?: RootState): EnhancedStore<RootState> {
  const store = configureStore({
    reducer: {
      electricSystem: electricitySlice,
      editor: editorSlice,
      tool: toolSlice,
      blockCategory: blockCategorySlice,
      blockType: blockTypeSlice,
      temporary: temporarySlice,
      block: blockSliceUndoable,
      building: buildingSliceUndoable,
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
  blockSettings: BlockTypeState;
};
