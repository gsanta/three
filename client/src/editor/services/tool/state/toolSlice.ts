import ToolName from './ToolName';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToolState = {
  selectedTool: ToolName;
};

export const initialToolState: ToolState = {
  selectedTool: ToolName.Add,
};

export const toolSlice = createSlice({
  name: 'tool',
  initialState: initialToolState,
  reducers: {
    setSelectedTool: (state, action: PayloadAction<ToolName>) => {
      state.selectedTool = action.payload;
    },
  },
});

export const { setSelectedTool } = toolSlice.actions;

export default toolSlice.reducer;
