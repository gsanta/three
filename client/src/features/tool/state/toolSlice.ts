import ToolName from '@/features/tool/state/ToolName';
import Editor from '@/services/editor/Editor';
import EditorApi from '@/services/editor/EditorApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Tool from './Tool';

interface ToolState {
  tools: Tool[];
  selectedTool: ToolName;
  editor?: EditorApi;
}

const initialState: ToolState = {
  tools: [
    { name: ToolName.Brush, iconName: 'BiPencil' },
    { name: ToolName.Rectangle, iconName: 'BiRectangle' },
    { name: ToolName.SelectionRectangle, iconName: 'BiBorderRadius' },
    { name: ToolName.Erase, iconName: 'BiEraser' },
    { name: ToolName.Pan, iconName: 'BiMove' },
    { name: ToolName.PaintBucket, iconName: 'BiColorFill' },
    { name: ToolName.ColorPicker, iconName: 'BiHighlight' },
    { name: ToolName.NewDrawing, iconName: 'BiImageAlt' },
  ],
  selectedTool: ToolName.Brush,
};

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    activateTool: (state, action: PayloadAction<ToolName>) => {
      state.editor?.addActiveTool(action.payload);
    },

    addTool: (state, action: PayloadAction<Tool>) => {
      state.tools.push(action.payload);
    },

    deActivateTool: (state, action: PayloadAction<ToolName>) => {
      state.editor?.removeActiveTool(action.payload);
    },

    initTools: (state, action: PayloadAction<Editor>) => {
      state.editor = action.payload;
    },

    setSelectedTool: (state, action: PayloadAction<ToolName>) => {
      const selectedTool = state.tools.find((tool) => tool.name === action.payload);
      if (selectedTool) {
        if (state.selectedTool) {
          state.editor?.removeActiveTool(state.selectedTool);
        }
        state.selectedTool = selectedTool.name;
        state.editor?.addActiveTool(action.payload);
      }
    },

    setToolData: (state, action: PayloadAction<ToolName>) => {
      const selectedTool = state.tools.find((tool) => tool.name === action.payload);
      if (selectedTool) {
        if (state.selectedTool) {
          state.editor?.removeActiveTool(state.selectedTool);
        }
        state.selectedTool = selectedTool.name;
        state.editor?.addActiveTool(action.payload);
      }
    },
  },
});

export const { activateTool, addTool, deActivateTool, initTools, setSelectedTool } = toolSlice.actions;

export default toolSlice.reducer;
