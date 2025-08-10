import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';
import BlockAddMethod from '@/common/model_types/BlockAddMethod';
import BlockAddMethodsResponse from '@/common/response_types/BlockAddMethodsResponse';
import BlockContextMenuAction, { BlockContextMenuActionName } from '@/common/model_types/BlockContextMenuAction';
import BlockContextMenuActionsResponse from '@/common/response_types/BlockContextMenuActionsResponse';
import { clearAll, historyAction, redoAction, undoAction, updateBlocks } from '../block/blockActions';
import SelectionUpdater from './SelectionUpdater';
import { BlockPartRole } from '../../models/block/part/BlockPartLookupData';
import HistoryStorage from '../utils/HistoryStorage';

export type BlockCategoyState = {
  addMethods: BlockAddMethod[];
  blockCategories: {
    name: BlockCategoryName;
  }[];
  contextMenuActions: BlockContextMenuAction[];

  selectedRootBlockIds: string[];
  selectedBlocks: Record<string, boolean>;
  currentContextMenuActions: BlockContextMenuAction[];
  currentItem?: string;

  redoSize: number;
  undoSize: number;
};

export const initialBlockTypeState: BlockCategoyState = {
  addMethods: [],
  blockCategories: [],
  contextMenuActions: [],
  currentContextMenuActions: [],
  currentItem: undefined,
  selectedBlocks: {},
  selectedRootBlockIds: [],
  undoSize: 0,
  redoSize: 0,
};

const selectionUpdater = new SelectionUpdater();

const history = new HistoryStorage<BlockCategoyState>(HistoryStorage.MAX_DEPTH);

const overwriteState = (writableState: BlockCategoyState, newState: Partial<BlockCategoyState>) => {
  writableState.selectedBlocks = newState.selectedBlocks || writableState.selectedBlocks;
  writableState.selectedRootBlockIds = newState.selectedRootBlockIds || writableState.selectedRootBlockIds;
};

export const blockCategorySlice = createSlice({
  name: 'block-category',
  initialState: initialBlockTypeState,
  reducers: {
    setBlockAddMethods(state, action: PayloadAction<BlockAddMethodsResponse['items']>) {
      state.addMethods = [];

      action.payload.forEach((item) => {
        item.categories.forEach((category) => {
          state.addMethods.push({
            ...item,
            sourceCategory: category.sourceCategoryName,
            sourcePartRole: category.sourcePartRole as BlockPartRole,
            targetPartRole: category.targetPartRole as BlockPartRole,
            targetCategory: category.targetCategoryName,
            connectionType: category.connectionType,
          });
        });
      });
    },

    setBlockContextMenuActions(state, action: PayloadAction<BlockContextMenuActionsResponse['items']>) {
      state.contextMenuActions = [];

      action.payload.forEach((item) => {
        item.categories.forEach((category) => {
          state.contextMenuActions.push({
            ...item,
            name: category.contextMenuActionName as BlockContextMenuActionName,
            categoryName: category.categoryName as BlockCategoryName,
            categoryName2: category.categoryName2 as BlockCategoryName,
          });
        });
      });
    },

    setBlockCategories(state, action: PayloadAction<BlockCategoriesResponse['items']>) {
      state.blockCategories = action.payload.map((item) => ({ name: item.name }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateBlocks, (state, action) => {
      if (action.payload.history) {
        history.push(structuredClone(current(state)));
      }

      state.undoSize = history.undoSize();
      state.redoSize = history.redoSize();

      selectionUpdater.update(state, action.payload.blockUpdates);
    });

    builder.addCase(historyAction, (state) => {
      history.push(structuredClone(current(state)));
    });

    builder.addCase(undoAction, (state) => {
      const previousState = history.undo(structuredClone(current(state)));

      state.undoSize = history.undoSize();
      state.redoSize = history.redoSize();
      overwriteState(state, previousState);
    });

    builder.addCase(redoAction, (state) => {
      const previousState = history.redo(structuredClone(current(state)));

      state.undoSize = history.undoSize();
      state.redoSize = history.redoSize();
      overwriteState(state, previousState);
    });

    builder.addCase(clearAll, (state) => {
      overwriteState(state, { selectedBlocks: {}, selectedRootBlockIds: [] });
    });
  },
});

export const { setBlockAddMethods, setBlockCategories, setBlockContextMenuActions } =
  blockCategorySlice.actions;

export default blockCategorySlice.reducer;
