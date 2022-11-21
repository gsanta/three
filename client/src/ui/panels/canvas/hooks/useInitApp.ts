import { AppContextType } from '@/core/AppContext';
import DependencyInjector from '@/services/core/DependencyInjector';
import { useEffect, useState } from 'react';

const useInitApp = (appContext: AppContextType, canvasNode?: HTMLDivElement) => {
  const [isModuleInitialized, setIsModuleInitialized] = useState(false);

  useEffect(() => {
    appContext.lifeCycleEventHandler.addListener(appContext.windowHandler);
    appContext.lifeCycleEventHandler.addListener(new DependencyInjector());
  }, [appContext.lifeCycleEventHandler, appContext.windowHandler]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (window?.Module?.isRuntimeInitialized && !isModuleInitialized) {
      appContext.editorApi.canvasNode = canvasNode;
      setIsModuleInitialized(true);
      appContext.lifeCycleEventHandler.emitCanvasInitialized(appContext);
    }
  });

  return {
    isModuleInitialized,
  };
};

export default useInitApp;
