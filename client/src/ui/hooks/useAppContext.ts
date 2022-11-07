import { useContext } from 'react';
import AppContext from '../../core/AppContext';

const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error('No appContext.Provider found when calling useAppContext.');
  return appContext;
};

export default useAppContext;
