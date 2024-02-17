import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Editor from './Editor';

type EditorState = {
  editor: Editor;
};

const initialState: EditorState = {} as EditorState;

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setEditor: (state, action: PayloadAction<Editor>) => {
      state.editor = action.payload;
    },
  },
});

export const { setEditor } = editorSlice.actions;

export default editorSlice.reducer;
