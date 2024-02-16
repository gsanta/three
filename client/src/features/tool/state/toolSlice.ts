import ToolName from '@/features/tool/state/ToolName';
import Editor from '@/features/editor/Editor';
import { Action, createSlice, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import Tool from './Tool';
import { RootState } from '@/common/utils/store';
import { ThreeEvent } from '@react-three/fiber';

interface ToolState {
  tools: Tool[];
  selectedTool: ToolName;
  editor?: Editor;

  isCircleFilled: boolean;
  isRectangleFilled: boolean;
  eraserSize: number;
  brushSize: number;
  pointer: { x: number; y: number; z: number };
}

const initialState: ToolState = {
  tools: [],
  selectedTool: ToolName.Brush,
  isCircleFilled: false,
  isRectangleFilled: false,
  eraserSize: 3,
  brushSize: 1,
  pointer: { x: 0, y: 0, z: 0 },
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

    setPointer: (state, action: PayloadAction<ToolState['pointer']>) => {
      state.pointer = action.payload;
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

    setTools: (state, action: PayloadAction<Tool[]>) => {
      state.tools = action.payload;
    },

    setCircleFilled: (state, action: PayloadAction<boolean>) => {
      state.editor?.setCircleToolFilled(action.payload);
      state.isCircleFilled = action.payload;
    },

    setEraserSize: (state, action: PayloadAction<number>) => {
      state.eraserSize = action.payload;
    },

    setBrushSize: (state, action: PayloadAction<number>) => {
      state.brushSize = action.payload;
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
  setBrushSize,
  setEraserSize,
  setPointer,
  setRectangleFilled,
  setSelectedTool,
  setTools,
} = toolSlice.actions;

export const onClick = () => {
  return (_dispatch: ThunkDispatch<unknown, unknown, Action>, getState: () => RootState) => {
    getState().tool.tools[0].onClick(getState().tool.pointer);
  };
};

export const onMouseMove = (event: ThreeEvent<PointerEvent>) => {
  return (dispatch: ThunkDispatch<unknown, unknown, Action>, getState: () => RootState) => {
    const state = getState().tool;
    dispatch(setPointer({ x: event.point.x, y: event.point.y, z: event.point.z }));
    state.tools[0].onMouseMove(state.pointer);
  };
};

export default toolSlice.reducer;
