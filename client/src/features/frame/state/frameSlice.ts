import Editor from '@/services/editor/Editor';
import EditorApi from '@/services/editor/EditorApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Frame from './Frame';

interface FrameState {
  frames: Frame[];
  activeIndex: number;
  editor?: EditorApi;
}

const initialState: FrameState = {
  frames: [],
  activeIndex: 0,
};

export const frameSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    addFrame: (state) => {
      state.editor?.addFrame();
      state.frames.push({ index: state.frames.length });
    },

    initFrames: (state, action: PayloadAction<Editor>) => {
      state.editor = action.payload;

      const framesList = state.editor?.getFrames();
      const framesJson = new Array<string>(framesList.size()).fill('').map((_, index) => framesList.get(index));
      const frames = framesJson.map<Frame>((frameJson) => JSON.parse(frameJson));
      state.frames = frames;
    },

    removeFrame: (state, action: PayloadAction<number>) => {
      state.editor?.removeFrame(action.payload);
      state.frames.splice(action.payload, 1);
      state.frames.forEach((frame, index) => (frame.index = index));

      const activeFrameJson = state.editor?.getActiveFrame() || '';
      state.activeIndex = JSON.parse(activeFrameJson).index;
    },

    setActiveFrame: (state, action: PayloadAction<number>) => {
      state.editor?.setActiveFrame(action.payload);
      state.activeIndex = action.payload;
    },
  },
});

export const { addFrame, initFrames, removeFrame, setActiveFrame } = frameSlice.actions;

export default frameSlice.reducer;
