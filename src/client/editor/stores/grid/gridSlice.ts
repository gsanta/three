import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import GraphCreator from './GraphCreator';
import { initState } from '../block/blockActions';
import Graph from './Graph';

export type GridState = {
  activeGridIndexes: number[];
  carGridPos: [number, number];
  editingTargetBlock: string | null;
  groundRadius: number;
  gridRows: number;
  gridCols: number;
  gridSize: number;
  gridOffset: [number, number];
  editedBuilding?: string;

  blockToGridIndex: Record<string, number>;

  graph: Graph;

  reachableGrids: Record<number, number>;
};

export const initialGridState: GridState = {
  activeGridIndexes: [],
  blockToGridIndex: {},
  carGridPos: [0, 0],
  editingTargetBlock: null,
  groundRadius: 70,
  gridRows: 16,
  gridCols: 20,
  gridSize: 7.5,
  gridOffset: [0, 0],
  graph: {},
  reachableGrids: {},
};

initialGridState.gridOffset[0] = 6.285 - 10 * initialGridState.gridSize;
initialGridState.gridOffset[1] = 6.325 - 8 * initialGridState.gridSize;

export const gridSlice = createSlice({
  name: 'editor',
  initialState: initialGridState,
  reducers: {
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
      state.editingTargetBlock = null;
    },

    setReachableGrids(state, action: PayloadAction<Record<number, number>>) {
      state.reachableGrids = action.payload;
    },
  },

  extraReducers: (builder) => {
    // builder.addCase(updateBlocks, (state, action) => {
    //   action.payload.blockUpdates.forEach((update) => {
    //     // if ('select' in update) {
    //     //   const player = update.select.find((block) => block.category === 'humans');
    //     //   if (player) {
    //     //     state.currentPlayer = player.id;
    //     //   }
    //     // } else

    //     if ('block' in update && update.block) {

    //       if (update.block.category === 'humans' && !state.players.includes(update.block.id)) {
    //         state.players.push(update.block.id);
    //       }
    //     }
    //   });
    // });

    builder.addCase(initState, (state) => {
      state.graph = new GraphCreator(state.gridRows, state.gridCols).create();
      console.log('1');
    });
  },
});

export const { clear: clearEditorSlice, setCarGridPos, setReachableGrids } = gridSlice.actions;

export default gridSlice.reducer;
