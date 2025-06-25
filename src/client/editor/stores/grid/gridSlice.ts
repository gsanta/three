import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import GraphCreator from './GraphCreator';
import { clearAll, historyAction, initState, redoAction, undoAction, updateBlocks } from '../block/blockActions';
import Graph from './Graph';
import GridUpdater from './GridUpdater';
import HistoryStorage from '../utils/HistoryStorage';

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

  blockToGridIndex: Record<string, number[]>;
  gridIndexToBlocks: Record<number, string[]>;

  graph: Graph;
};

export const initialGridState: GridState = {
  activeGridIndexes: [],
  blockToGridIndex: {},
  carGridPos: [0, 0],
  editingTargetBlock: null,
  gridIndexToBlocks: {},
  groundRadius: 70,
  gridRows: 16,
  gridCols: 20,
  gridSize: 7.5,
  gridOffset: [0, 0],
  graph: {},
};

initialGridState.gridOffset[0] = 6.285 - 10 * initialGridState.gridSize;
initialGridState.gridOffset[1] = 6.325 - 8 * initialGridState.gridSize;

const gridUpdater = new GridUpdater();

const history = new HistoryStorage<Partial<GridState>>(HistoryStorage.MAX_DEPTH);

const overwriteState = (writableState: GridState, newState: Partial<GridState>) => {
  writableState.activeGridIndexes = newState.activeGridIndexes || writableState.activeGridIndexes;
  writableState.blockToGridIndex = newState.blockToGridIndex || writableState.blockToGridIndex;
  writableState.carGridPos = newState.carGridPos || writableState.carGridPos;
  writableState.editingTargetBlock = newState.editingTargetBlock || writableState.editingTargetBlock;
  writableState.gridIndexToBlocks = newState.gridIndexToBlocks || writableState.gridIndexToBlocks;
  writableState.groundRadius = newState.groundRadius || writableState.groundRadius;
  writableState.gridRows = newState.gridRows || writableState.gridRows;
  writableState.gridCols = newState.gridCols || writableState.gridCols;
  writableState.gridSize = newState.gridSize || writableState.gridSize;
  writableState.gridOffset = newState.gridOffset || writableState.gridOffset;
  writableState.editedBuilding = newState.editedBuilding || writableState.editedBuilding;
  writableState.graph = newState.graph || writableState.graph;
};

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
    });

    builder.addCase(historyAction, (state) => {
      history.push(structuredClone(current(state)));
    });

    builder.addCase(updateBlocks, (state, action) => {
      if (action.payload.history) {
        history.push(structuredClone(current(state)));
      }

      gridUpdater.update(state, action.payload.blockUpdates);
    });

    builder.addCase(undoAction, (state) => {
      const previousState = history.undo(structuredClone(current(state)));

      overwriteState(state, previousState);
    });

    builder.addCase(redoAction, (state) => {
      const previousState = history.redo(structuredClone(current(state)));

      overwriteState(state, previousState);
    });

    builder.addCase(clearAll, (state) => {
      overwriteState(state, {
        activeGridIndexes: [],
        blockToGridIndex: {},
        carGridPos: [0, 0],
        editingTargetBlock: null,
        gridIndexToBlocks: {},
      });
    });
  },
});

export const { clear: clearEditorSlice, setCarGridPos } = gridSlice.actions;

export default gridSlice.reducer;
