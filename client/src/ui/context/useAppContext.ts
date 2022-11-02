import { useContext } from 'react';
import EditorContext from './EditorContext';

const useAppContext = () => {
  const appContext = useContext(EditorContext);
  if (!appContext) throw new Error('No appContext.Provider found when calling useAppContext.');
  return appContext;
};

export default useAppContext;
