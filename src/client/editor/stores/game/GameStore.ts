import { Store } from '@/client/common/utils/store';

class GameStore {
  constructor(store: Store) {
    this.store = store;
  }

  getCurrentPlayer() {
    const currentPlayer = this.getStore().currentPlayer;

    if (currentPlayer === undefined) {
      throw new Error('current player is undefined');
    }

    return currentPlayer;
  }

  getPlayers() {
    return this.getStore().players;
  }

  private getStore() {
    return this.store.getState().game;
  }

  private store: Store;
}

export default GameStore;
