import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import BlockCategory from '../../types/block/BlockCategory';
import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';
import BlockAddMethod from '@/common/model_types/BlockAddMethod';
import BlockAddMethodsResponse from '@/common/response_types/BlockAddMethodsResponse';

export type BlockCategoyState = {
  addMethods: BlockAddMethod[];
  blockCategories: BlockCategory[];
};

export const initialBlockTypeState: BlockCategoyState = {
  addMethods: [],
  blockCategories: [],
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
            category: category.categoryName,
            sourcePartName: category.sourcePartName,
          });
        });
      });
    },

    setBlockCategories(state, action: PayloadAction<BlockCategoriesResponse['items']>) {
      state.blockCategories = action.payload.map((item) => ({ name: item.name }));
    },
  },
});

export const { setBlockAddMethods, setBlockCategories } = blockCategorySlice.actions;

export default blockCategorySlice.reducer;
