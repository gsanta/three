import ToolName from './ToolName';
import { Action, createSlice, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import Tool from './Tool';
import { RootState } from '../../../common/utils/store';
import { ThreeEvent } from '@react-three/fiber';

interface ToolState {
  tools: Tool[];
  selectedTool: ToolName;

  isCircleFilled: boolean;
  isRectangleFilled: boolean;
  eraserSize: number;
  brushSize: number;
  pointer: { x: number; y: number; z: number };
}

const initialState: ToolState = {
  tools: [],
  selectedTool: ToolName.Add,
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
    addTool: (state, action: PayloadAction<Tool>) => {
      state.tools.push(action.payload);
    },
    setPointer: (state, action: PayloadAction<ToolState['pointer']>) => {
      state.pointer = action.payload;
    },

    setTools: (state, action: PayloadAction<Tool[]>) => {
      state.tools = action.payload;
    },
  },
});

export const { addTool, setPointer, setTools } = toolSlice.actions;

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
