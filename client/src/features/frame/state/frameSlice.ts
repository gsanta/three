import Editor from '@/features/editor/Editor';
import EditorApi from '@/features/editor/EditorApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Frame from './Frame';

interface FrameState {
  activeIndex: number;
  editor?: EditorApi;
  frames: Frame[];
  isPlaying: boolean;
}

const initialState: FrameState = {
  frames: [],
  activeIndex: 0,
  isPlaying: false,
};

export const frameSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    activeFrameChanged: (state) => {
      const activeFrameJson = state.editor?.getActiveFrame() || '';
      state.activeIndex = JSON.parse(activeFrameJson).index;
    },

    activateFramePlayer: (state) => {
      state.editor?.activateFramePlayer();
      state.isPlaying = true;
    },

    addFrame: (state) => {
      state.editor?.addFrame();
      state.frames.push({ index: state.frames.length });
    },

    deActivateFramePlayer: (state) => {
      state.editor?.deActivateFramePlayer();
      state.isPlaying = false;
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

export const {
  activeFrameChanged,
  activateFramePlayer,
  addFrame,
  deActivateFramePlayer,
  initFrames,
  removeFrame,
  setActiveFrame,
} = frameSlice.actions;

export default frameSlice.reducer;
