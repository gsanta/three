import { Store } from '@reduxjs/toolkit';
import { GameState } from './gameSlice';

class GameSerializer {
  sliceName = 'game';

  constructor(store: Store) {
    this.store = store;
  }

  export(): GameState {
    const gameState = this.store.getState().game;

    return gameState;
  }

  private store: Store;
}

export default GameSerializer;
