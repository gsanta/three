class HistoryStorage<T> {
  constructor(private maxDepth: number = HistoryStorage.MAX_DEPTH) {}

  push(state: T) {
    if (this.undoHistory.length >= this.maxDepth) {
      this.undoHistory.shift();
    }
    this.undoHistory.push(state);
    this.redoHistory = []; // Clear redo stack on new change
  }

  undo(currentState: T): T {
    const prevState = this.undoHistory.pop();
    if (prevState === undefined) {
      throw new Error('No items in history to undo');
    }

    this.redoHistory.push(currentState); // Save current for redo
    return prevState;
  }

  redo(currentState: T): T {
    const nextState = this.redoHistory.pop();
    if (nextState === undefined) {
      throw new Error('No items in history to redo');
    }

    this.undoHistory.push(currentState); // Save current for undo
    return nextState;
  }

  redoSize(): number {
    return this.redoHistory.length;
  }

  undoSize(): number {
    return this.undoHistory.length;
  }

  public static MAX_DEPTH = 30;

  private undoHistory: T[] = [];

  private redoHistory: T[] = [];
}

export default HistoryStorage;
