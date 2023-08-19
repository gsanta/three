import ToolName from '@/features/tool/state/ToolName';
import Editor from '@/features/editor/Editor';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Tool from './Tool';

interface ToolState {
  tools: Tool[];
  selectedTool: ToolName;
  editor?: Editor;

  isCircleFilled: boolean;
  isRectangleFilled: boolean;
  eraserSize: number;
}

const initialState: ToolState = {
  tools: [
    { name: ToolName.Brush, iconName: 'BiPencil' },
    { name: ToolName.SelectionRectangle, iconName: 'BiBorderRadius' },
    { name: ToolName.Erase, iconName: 'BiEraser' },
    { name: ToolName.Rectangle, iconName: 'BiRectangle' },
    { name: ToolName.Circle, iconName: 'BiCircle' },
    { name: ToolName.Line, iconName: 'BsSlashLg' },
    { name: ToolName.PaintBucket, iconName: 'BiColorFill' },
    { name: ToolName.ColorPicker, iconName: 'BiHighlight' },
    { name: ToolName.Pan, iconName: 'BiMove' },
    { name: ToolName.NewDrawing, iconName: 'BiImageAlt' },
  ],
  selectedTool: ToolName.Brush,
  isCircleFilled: false,
  isRectangleFilled: false,
  eraserSize: 3,
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
      state.isCircleFilled = state.editor.isCircleToolFilled();
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

    setCircleFilled: (state, action: PayloadAction<boolean>) => {
      state.editor?.setCircleToolFilled(action.payload);
      state.isCircleFilled = action.payload;
    },

    setEraserSize: (state, action: PayloadAction<number>) => {
      state.eraserSize = action.payload;
    },

    setRectangleFilled: (state, action: PayloadAction<boolean>) => {
      state.editor?.setRectangleToolFilled(action.payload);
      state.isRectangleFilled = action.payload;
    },
  },
});

export const {
  activateTool,
  addTool,
  deActivateTool,
  initTools,
  setCircleFilled,
  setEraserSize,
  setRectangleFilled,
  setSelectedTool,
} = toolSlice.actions;

export default toolSlice.reducer;
