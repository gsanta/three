import MakeValueObservable from '../types/MakeValueObservable';

export class ObserverHandler<S> {
  private observers: ((store: S) => unknown)[] = [];

  private values: unknown[] = [];

  private bindingIdCounter = 0;

  private stateUpdater: () => void = () => {};

  private store: S;

  constructor(updater: () => void, store: S) {
    this.stateUpdater = updater;
    this.store = store;
  }

  getBinding(): MakeValueObservable<S> {
    return <T>(getter: (store: S) => T) => {
      const currCounter = this.bindingIdCounter;
      this.bindingIdCounter += 1;
      this.observers[currCounter] = getter;
      this.values[currCounter] = getter(this.store);
      return {
        getVal: () => this.values[currCounter] as T,
        store: this.store,
      };
    };
  }

  updateState() {
    const newValues = this.observers.map((getter) => getter(this.store));
    for (let i = 0; i < newValues.length; i++) {
      if (newValues[i] !== this.values[i]) {
        this.values[i] = newValues[i];
        this.stateUpdater();
        return;
      }
    }
  }
}
