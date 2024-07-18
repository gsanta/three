import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type EditorState = {
  carGridPos: [number, number];
  editingMode: 'wiring' | null;
  editingTargetBlock: string | null;
  groundRadius: number;
  gridSize: number;
  gridOffset: [number, number];
};

export const initialEditorState: EditorState = {
  carGridPos: [0, 0],
  editingMode: null,
  editingTargetBlock: null,
  groundRadius: 70,
  gridSize: 7.5,
  gridOffset: [0, 0],
};

initialEditorState.gridOffset[0] = 6.285 - 10 * initialEditorState.gridSize;
initialEditorState.gridOffset[1] = 6.325 - 8 * initialEditorState.gridSize;

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

    setCarGridPos(state, action: PayloadAction<[number, number]>) {
      state.carGridPos = action.payload;
    },

    clear(state) {
      state.editingMode = null;
      state.editingTargetBlock = null;
    },
  },
});

export const { clear: clearEditorSlice, setCarGridPos, setEditMode } = editorSlice.actions;

export default editorSlice.reducer;
