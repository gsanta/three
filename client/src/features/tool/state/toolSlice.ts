import type { PointerInfo } from './Tool';
import ToolName from './ToolName';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToolState {
  pointer: PointerInfo;
  selectedTool: ToolName;
}

const initialState: ToolState = {
  pointer: { x: 0, y: 0, z: 0, eventObjectName: '' },
  selectedTool: ToolName.Add,
};

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setPointer: (state, action: PayloadAction<Partial<PointerInfo>>) => {
      state.pointer = {
        ...state.pointer,
        ...action.payload,
      };
    },

    setSelectedTool: (state, action: PayloadAction<ToolName>) => {
      state.selectedTool = action.payload;
    },
  },
});

export const { setPointer, setSelectedTool } = toolSlice.actions;

export default toolSlice.reducer;
