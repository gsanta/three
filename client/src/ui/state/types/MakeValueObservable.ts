type MakeValueObservable<S> = <T>(observer: (store: S) => T) => {
  getVal: () => ReturnType<typeof observer>;
  store: S;
};

export default MakeValueObservable;
