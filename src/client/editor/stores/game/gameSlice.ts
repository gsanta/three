import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { historyAction, importAction, redoAction, undoAction, updateBlocks } from '../block/blockActions';
import HistoryStorage from '../utils/HistoryStorage';

export type GameState = {
  currentPlayer?: string;
  players: string[];
  gameState: 'started' | 'not-started';

  reachableGrids: Record<number, number>;
};

export const initialGameState: GameState = {
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
    setSelectedPlayer(state, action: PayloadAction<string>) {
      state.currentPlayer = action.payload;
    },
    setReachableGrids(state, action: PayloadAction<Record<number, number>>) {
      state.reachableGrids = action.payload;
    },
    setGameState(state, action: PayloadAction<GameState['gameState']>) {
      state.gameState = action.payload;
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

        // if ('select' in update) {
        //   const player = update.select.find((block) => block.category === 'humans');
        //   if (player) {
        //     state.currentPlayer = player.id;
        //   }
        // } else

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

export const { setGameState, setReachableGrids, setSelectedPlayer } = gameSlice.actions;

export default gameSlice.reducer;
