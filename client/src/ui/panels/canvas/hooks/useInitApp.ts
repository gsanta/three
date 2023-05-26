import { initFrames } from '@/features/frame/state/frameSlice';
import { initSettings } from '@/features/settings/state/settingsSlice';
import { initTools } from '@/features/tool/state/toolSlice';
import { initLayers } from '@/panels/layer/state/layerSlice';
import { store } from '@/store';
import { App } from '../../../../app/App';
import { useEffect, useState } from 'react';

const useInitApp = (appContext: App, canvasNode?: HTMLCanvasElement) => {
  const [isModuleInitialized, setIsModuleInitialized] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    appContext.editorApi.canvas = canvasNode;
    if (window?.Module?.isRuntimeInitialized && !isModuleInitialized) {
      setIsModuleInitialized(true);

      store.dispatch(initFrames(appContext.editorApi));
      store.dispatch(initLayers(appContext.editorApi));
      store.dispatch(initTools(appContext.editorApi));
      store.dispatch(initSettings(appContext.editorApi));

      console.log('hello');
    }
  });

  return {
    isModuleInitialized,
  };
};

export default useInitApp;
