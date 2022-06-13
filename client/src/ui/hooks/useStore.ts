import { useContext, useEffect, useMemo } from 'react';
import { MakeObservable, ComponentObserver } from './ComponentObserver';
import useForceUpdate from './useForceUpdate';

function useStore<T, A extends keyof T>(reactContext: React.Context<T>, store1: A): [MakeObservable<Required<T>[A]> | undefined];
function useStore<T, A extends keyof T, B extends keyof T>(reactContext: React.Context<T>, store1: A, store2: B): [MakeObservable<Required<T>[A]> | undefined, MakeObservable<Required<T>[B]> | undefined];
function useStore<T>(reactContext: React.Context<T>, ...keys: (keyof T)[]): (MakeObservable<any> | undefined)[] {
  const context = useContext(reactContext);
  const stores: unknown[] = keys.map((key) => context[key]);

  const forceUpdate = useForceUpdate();

  const observers = useMemo(() => {
    return stores.map((store) => store ? new ComponentObserver(forceUpdate, store) : undefined);
  }, [...stores])

  useEffect(() => {
    stores.forEach((store, index) => store && (store as any).__componentObservers.push(observers[index]));

    return () => {
      stores.forEach((store, index) => {
        if (!store) {
          return;
        }

        const observable = store as unknown as {__componentObservers: ComponentObserver<unknown>[]}
        observable.__componentObservers = observable.__componentObservers.filter((currObserver) => currObserver !== observers[index]);
        (store as any).__componentObservers.push(observers[index]);
      })
    }
  }, [...observers, ...stores])

  return observers.map((observer) => observer?.getMakeObservable());
};

export default useStore;
