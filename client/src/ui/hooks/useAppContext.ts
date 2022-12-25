import { useContext } from 'react';
import { AppContext } from '../../app/App';

const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error('No appContext.Provider found when calling useAppContext.');
  return appContext;
};

export default useAppContext;
