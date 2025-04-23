import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import BlockCategory, { BlockCategoryName } from '../../models/block/BlockCategory';
import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';
import BlockAddMethod from '@/common/model_types/BlockAddMethod';
import BlockAddMethodsResponse from '@/common/response_types/BlockAddMethodsResponse';
import { ModelPartRole } from '../../models/BlockType';
import BlockContextMenuAction, { BlockContextMenuActionName } from '@/common/model_types/BlockContextMenuAction';
import BlockContextMenuActionsResponse from '@/common/response_types/BlockContextMenuActionsResponse';

export type BlockCategoyState = {
  addMethods: BlockAddMethod[];
  blockCategories: BlockCategory[];
  contextMenuActions: BlockContextMenuAction[];

  selectedRootBlockIds: string[];
  selectedBlocks: Record<string, boolean>;
  selectedPartIndexes: Record<string, string[]>;
};

export const initialBlockTypeState: BlockCategoyState = {
  addMethods: [],
  blockCategories: [],
  contextMenuActions: [],
  selectedBlocks: {},
  selectedRootBlockIds: [],
  selectedPartIndexes: {},
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
            sourcePartRole: category.sourcePartRole as ModelPartRole,
            targetPartRole: category.targetPartRole as ModelPartRole,
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
});

export const { setBlockAddMethods, setBlockCategories, setBlockContextMenuActions } = blockCategorySlice.actions;

export default blockCategorySlice.reducer;
