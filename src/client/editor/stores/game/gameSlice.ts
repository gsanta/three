import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateBlocks } from '../block/blockActions';

export type GameState = {
  currentPlayer?: string;
  players: string[];
  gameState: 'started' | 'not-started';
};

export const initialGameState: GameState = {
  gameState: 'not-started',
  players: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    setSelectedPlayer(state, action: PayloadAction<string>) {
      state.currentPlayer = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateBlocks, (state, action) => {
      action.payload.blockUpdates.forEach((update) => {
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
  },
});

export const { setSelectedPlayer } = gameSlice.actions;

export default gameSlice.reducer;
