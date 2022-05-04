import { useContext } from 'react';
import DataContext, { DataContextType } from '../DataContext';

const useStore = <T extends keyof DataContextType>(storeKey: T) => {
  const context = useContext(DataContext);
  const store = context[storeKey];

  return store;
};

export default useStore;
