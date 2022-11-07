import { AppContextType } from '@/core/AppContext';
import PreviewModule from '@/services/preview/PreviewModule';
import { useEffect } from 'react';

const useCanvasService = (appContext: AppContextType) => {
  useEffect(() => {
    const { moduleManager } = appContext;
    moduleManager.addModule(new PreviewModule(appContext));
  }, [appContext]);

  if (window.Module) {
    appContext.canvasEventHandler.emitCanvasReady(window.Module);
  }

  return window.Module;
};

export default useCanvasService;
