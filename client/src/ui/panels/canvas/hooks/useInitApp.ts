import { App } from '../../../../app/App';
import DependencyInjector from '../../../../app/DependencyInjector';
import { useEffect, useRef, useState } from 'react';

const useInitApp = (appContext: App, canvasNode?: HTMLCanvasElement) => {
  const [isModuleInitialized, setIsModuleInitialized] = useState(false);

  const dependencyInjector = useRef(new DependencyInjector(appContext));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    appContext.editorApi.canvas = canvasNode;
    if (window?.Module?.isRuntimeInitialized && !isModuleInitialized) {
      setIsModuleInitialized(true);
      dependencyInjector.current.init();
    }
  });

  return {
    isModuleInitialized,
  };
};

export default useInitApp;
