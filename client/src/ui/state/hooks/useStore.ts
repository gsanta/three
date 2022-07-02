import { useContext, useEffect, useMemo } from 'react';
import { ObserverHandler } from '../models/ObserverHandler';
import MakeValueObservable from '../types/MakeValueObservable';
import ObservableObject from '../types/ObservableObject';
import useForceUpdate from './useForceUpdate';

function useStore<T, A extends keyof T>(
  reactContext: React.Context<T>,
  store1: A,
): [MakeValueObservable<Required<T>[A]> | undefined];
function useStore<T, A extends keyof T, B extends keyof T>(
  reactContext: React.Context<T>,
  store1: A,
  store2: B,
): [MakeValueObservable<Required<T>[A]> | undefined, MakeValueObservable<Required<T>[B]> | undefined];
function useStore<T>(reactContext: React.Context<T>, ...keys: (keyof T)[]): (MakeValueObservable<any> | undefined)[] {
  const context = useContext(reactContext);
  const stores: ObservableObject[] = keys.map((key) => context[key]) as unknown as ObservableObject[];

  const forceUpdate = useForceUpdate();

  const observers = useMemo(() => {
    return stores.map((store) => (store ? new ObserverHandler(forceUpdate, store) : undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...stores]);

  useEffect(() => {
    stores.forEach((store, index) => store && (store as any).__componentObservers.push(observers[index]));

    return () => {
      stores.forEach((store, index) => {
        if (!store) {
          return;
        }

        const observable = store as unknown as { __componentObservers: ObserverHandler<unknown>[] };
        observable.__componentObservers = observable.__componentObservers.filter(
          (currObserver) => currObserver !== observers[index],
        );
        const observer = observers[index];
        if (observer) {
          store.__componentObservers.push(observer);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...observers, ...stores]);

  return observers.map((observer) => observer?.getBinding());
}

export default useStore;
