import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type EditorState = {
  editingMode: 'wiring' | null;
  editingTargetBlock: string | null;
};

export const initialEditorState: EditorState = {
  editingMode: null,
  editingTargetBlock: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState: initialEditorState,
  reducers: {
    setEditMode(
      state,
      action: PayloadAction<{ editingMode: EditorState['editingMode']; editingTargetBlock: string | null }>,
    ) {
      state.editingMode = action.payload?.editingMode;
      state.editingTargetBlock = action.payload?.editingTargetBlock;
    },
  },
});

export const { setEditMode } = editorSlice.actions;

export default editorSlice.reducer;
