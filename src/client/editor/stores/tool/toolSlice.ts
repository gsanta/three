import Num3 from '../../types/Num3';
import ToolName from '../../types/ToolName';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToolState = {
  selectedTool: ToolName;
  select: {
    moveAxis: [boolean, boolean, boolean];
    templateName: string;
    drag: Num3;
  };
};

export const initialToolState: ToolState = {
  selectedTool: ToolName.Select,
  select: {
    moveAxis: [true, true, true],
    templateName: 'box',
    drag: [0, 0, 0],
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
