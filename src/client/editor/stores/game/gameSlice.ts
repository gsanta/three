import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { historyAction, importAction, redoAction, undoAction, updateBlocks } from '../block/blockActions';
import HistoryStorage from '../utils/HistoryStorage';
import { WorldPositionPath } from '../../use_cases/grid/WorldPositionPathBuilder';

export type GameState = {
  activeGridIndexes: number[];
  currentPlayer?: string;
  currentMovementPath?: WorldPositionPath;
  players: string[];
  gameState: 'started' | 'not-started';

  reachableGrids: Record<number, number>;
};

export const initialGameState: GameState = {
  activeGridIndexes: [],
  currentMovementPath: undefined,
  gameState: 'not-started',
  players: [],
  reachableGrids: {},
};

const overwriteState = (writableState: GameState, newState: Partial<GameState>) => {
  writableState.gameState = newState.gameState || writableState.gameState;
  writableState.currentPlayer = newState.currentPlayer || writableState.currentPlayer;
  writableState.players = newState.players || writableState.players;
  writableState.reachableGrids = newState.reachableGrids || writableState.reachableGrids;
};

const history = new HistoryStorage<Partial<GameState>>(HistoryStorage.MAX_DEPTH);

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    setActiveGridIndexes(state, action: PayloadAction<number[]>) {
      state.activeGridIndexes = action.payload;
    },
    setCurrentMovementPath(state, action: PayloadAction<WorldPositionPath | undefined>) {
      state.currentMovementPath = action.payload;
    },
    setGameState(state, action: PayloadAction<GameState['gameState']>) {
      state.gameState = action.payload;
    },
    setReachableGrids(state, action: PayloadAction<Record<number, number>>) {
      state.reachableGrids = action.payload;
    },
    setSelectedPlayer(state, action: PayloadAction<string>) {
      state.currentPlayer = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateBlocks, (state, action) => {
      action.payload.blockUpdates.forEach((update) => {
        if (action.payload.history) {
          history.push(
            structuredClone({ players: current(state.players), reachableGrids: current(state.reachableGrids) }),
          );
        }

        if ('block' in update && update.block) {
          if (update.block.category === 'humans' && !state.players.includes(update.block.id)) {
            state.players.push(update.block.id);
          }
        }
      });
    });

    builder.addCase(historyAction, (state) => {
      history.push(structuredClone(current(state)));
    });

    builder.addCase(undoAction, (state) => {
      const previousState = history.undo(structuredClone(current(state)));

      overwriteState(state, previousState);
    });

    builder.addCase(redoAction, (state) => {
      const previousState = history.redo(structuredClone(current(state)));

      overwriteState(state, previousState);
    });

    builder.addCase(importAction, (state, action) => {
      overwriteState(state, action.payload.game);
    });
  },
});

export const {
  setActiveGridIndexes,
  setCurrentMovementPath,
  setGameState,
  setReachableGrids,
  setSelectedPlayer,
} = gameSlice.actions;

export default gameSlice.reducer;
