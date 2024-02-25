import ToolName from './ToolName';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToolState {
  selectedTool: ToolName;
}

const initialState: ToolState = {
  selectedTool: ToolName.Add,
};

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setSelectedTool: (state, action: PayloadAction<ToolName>) => {
      state.selectedTool = action.payload;
    },
  },
});

export const { setSelectedTool } = toolSlice.actions;

export default toolSlice.reducer;
