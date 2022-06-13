export type MakeObservable<S> = <T>(getter: (store: S) => T) => {
  getVal: () => ReturnType<typeof getter>,
  store: S,
}

export class ComponentObserver<S> {
  private getters: ((store: S) => unknown)[] = [];
  private values: unknown[] = [];
  private counter = 0; 
  private stateUpdater: () => void = () => {};
  private store: S;

  constructor(updater: () => void, store: S) {
    this.stateUpdater = updater;
    this.store = store;
  }

  getMakeObservable(): MakeObservable<S> {
    return <T>(getter: (store: S) => T) => {
      const currCounter = this.counter;
      this.counter++;
      this.getters[currCounter] = getter;
      return {
        getVal: () => this.values[currCounter] as T,
        store: this.store,
      }
    }
  }

  updateState() {
    const newValues = this.getters.map((getter) => getter(this.store));
    for (let i = 0; i < newValues.length; i++) {
      if (newValues[i] !== this.values[i]) {
        this.values[i] = newValues[i];
        this.stateUpdater();
        return;
      }
    }
  }
}
