import { AppContextType } from '@/core/AppContext';
import useAppContext from '@/ui/hooks/useAppContext';
import { useEffect, useState } from 'react';

const useInitApp = (appContext: AppContextType, canvasNode?: HTMLDivElement) => {
  const [isModuleInitialized, setIsModuleInitialized] = useState(false);

  const { toolStore } = useAppContext();

  useEffect(() => {
    appContext.lifeCycleEventHandler.addListener(appContext.windowHandler);
  }, [appContext.lifeCycleEventHandler, appContext.windowHandler]);

  useEffect(() => {
    if (window?.Module?.isRuntimeInitialize && !isModuleInitialized) {
      window.Module.canvasNode = canvasNode;
      appContext.canvasService = window.Module;
      setIsModuleInitialized(true);
      appContext.lifeCycleEventHandler.emitCanvasInitialized(appContext);
    }
  }, [appContext, canvasNode, isModuleInitialized, toolStore]);

  return {
    isModuleInitialized,
  };
};

export default useInitApp;
