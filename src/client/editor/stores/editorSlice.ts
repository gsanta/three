import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type EditorState = {
  activeGridIndexes: number[];
  carGridPos: [number, number];
  editingMode: 'wiring' | null;
  editingTargetBlock: string | null;
  groundRadius: number;
  gridRows: number;
  gridCols: number;
  gridSize: number;
  gridOffset: [number, number];
  mode: 'city' | 'building';
  editedBuilding?: string;
};

export const initialEditorState: EditorState = {
  activeGridIndexes: [],
  carGridPos: [0, 0],
  editingMode: null,
  editingTargetBlock: null,
  groundRadius: 70,
  gridRows: 16,
  gridCols: 20,
  gridSize: 7.5,
  gridOffset: [0, 0],
  mode: 'city',
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

    setBuildingMode(state, action: PayloadAction<{ editedBuilding: string }>) {
      state.mode = 'building';
      state.editedBuilding = action.payload.editedBuilding;
    },

    setCityMode(state) {
      state.mode = 'city';
    },

    setCarGridPos(state, action: PayloadAction<[number, number]>) {
      state.carGridPos = action.payload;

      const x = action.payload[0];
      const y = action.payload[1];

      const gridIndex = state.gridCols * y + x;

      const activeGridIndexes: number[] = [gridIndex];

      const minX = x > 0 ? x - 1 : 0;
      const maxX = x < state.gridCols - 1 ? x + 1 : state.gridCols - 1;
      const minY = y > 0 ? y - 1 : 0;
      const maxY = y < state.gridRows - 1 ? y + 1 : state.gridRows - 1;

      for (let i = minY; i <= maxY; i++) {
        for (let j = minX; j <= maxX; j++) {
          activeGridIndexes.push(i * state.gridCols + j);
        }
      }

      state.activeGridIndexes = activeGridIndexes;
    },

    clear(state) {
      state.editingMode = null;
      state.editingTargetBlock = null;
    },
  },
});

export const {
  clear: clearEditorSlice,
  setCarGridPos,
  setEditMode,
  setBuildingMode,
  setCityMode,
} = editorSlice.actions;

export default editorSlice.reducer;
