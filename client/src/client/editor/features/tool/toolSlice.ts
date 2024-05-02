import ToolName from './state/ToolName';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToolState = {
  selectedTool: ToolName;
  select: {
    templateName: string;
  };
};

export const initialToolState: ToolState = {
  selectedTool: ToolName.Add,
  select: {
    templateName: 'box',
  },
};

export const toolSlice = createSlice({
  name: 'tool',
  initialState: initialToolState,
  reducers: {
    setSelectedTool: (state, action: PayloadAction<ToolName>) => {
      state.selectedTool = action.payload;
    },

    updateSelectTool(state, action: PayloadAction<Partial<ToolState['select']>>) {
      state.select = {
        ...state.select,
        ...action.payload,
      };
    },
  },
});

export const { setSelectedTool, updateSelectTool } = toolSlice.actions;

export default toolSlice.reducer;
