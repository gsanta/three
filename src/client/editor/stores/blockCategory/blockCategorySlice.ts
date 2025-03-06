import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import BlockCategory from '../../types/block/BlockCategory';
import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';

export type BlockCategoyState = {
  blockCategories: BlockCategory[];
};

export const initialBlockTypeState: BlockCategoyState = {
  blockCategories: [],
};

export const blockCategorySlice = createSlice({
  name: 'frame',
  initialState: initialBlockTypeState,
  reducers: {
    setBlockCategories(state, action: PayloadAction<BlockCategoriesResponse['items']>) {
      state.blockCategories = action.payload.map((item) => item.name);
    },
  },
});

export const { setBlockCategories } = blockCategorySlice.actions;

export default blockCategorySlice.reducer;
