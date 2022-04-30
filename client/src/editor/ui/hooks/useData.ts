import { useContext, useEffect } from 'react';
import DataContext, { DataContextType } from '../DataContext';
import useForceUpdate from './useForceUpdate';

function useData<T extends keyof DataContextType, K extends keyof DataContextType[T]>(
  obj: T,
  key1: K,
): [DataContextType[T][K]];

function useData<
  T extends keyof DataContextType,
  K extends keyof DataContextType[T],
  I extends keyof DataContextType[T],
>(obj: T, key1: K, key2: I): [DataContextType[T][K], DataContextType[T][I]];

function useData<T extends keyof DataContextType>(obj: T, ...keys: any[]) {
  const context = useContext(DataContext);
  const dataObj = context[obj];

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (!dataObj) {
      return;
    }

    if (!(dataObj as any).__injector) {
      (dataObj as any).__injector = {};
    }

    keys.forEach((key) => {
      if (!(dataObj as any).__injector[key]) {
        (dataObj as any).__injector[key] = [];
      }
      (dataObj as any).__injector[key].push(forceUpdate);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataObj, forceUpdate, obj]);

  return dataObj ? keys.map((key: string) => (dataObj as any)[key]) : [];
}

export default useData;
