import { App } from '../../../../app/App';
import DependencyInjector from '../../../../app/DependencyInjector';
import { useEffect, useState } from 'react';

const useInitApp = (appContext: App, canvasNode?: HTMLCanvasElement) => {
  const [isModuleInitialized, setIsModuleInitialized] = useState(false);

  useEffect(() => {
    appContext.editorEvents.addListener(appContext.windowHandler);
    appContext.editorEvents.addListener(new DependencyInjector(appContext));
  }, [appContext, appContext.editorEvents, appContext.windowHandler]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    appContext.editorApi.canvas = canvasNode;
    if (window?.Module?.isRuntimeInitialized && !isModuleInitialized) {
      appContext.editorApi.canvasNode = canvasNode?.parentElement as HTMLDivElement;
      setIsModuleInitialized(true);
      appContext.editorEvents.emitEditorInitialized();
    }
  });

  return {
    isModuleInitialized,
  };
};

export default useInitApp;
