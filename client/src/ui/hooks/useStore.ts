import { useContext, useEffect, useMemo } from 'react';
import DataContext, { DataContextType } from '../DataContext';
import { MakeObservable, ComponentObserver } from './ComponentObserver';
import useForceUpdate from './useForceUpdate';

const useStore = <T extends keyof DataContextType>(storeKey: T): MakeObservable<typeof store> | undefined => {
  const context = useContext(DataContext);
  const store = context[storeKey] as DataContextType[T];

  const forceUpdate = useForceUpdate();

  const observer = useMemo(() => {
    return store ? new ComponentObserver(forceUpdate, store) : undefined;
  }, [store])

  useEffect(() => {
    if (!store) {
      return;
    } 

    (store as any).__componentObservers.push(observer);

    return () => {
      const observable = store as unknown as {__componentObservers: ComponentObserver<unknown>[]}
      observable.__componentObservers = observable.__componentObservers.filter((currObserver) => currObserver !== observer);
      (store as any).__componentObservers.push(observer);
    }
  }, [observer, store])

  return observer?.getMakeObservable();
};

export default useStore;
