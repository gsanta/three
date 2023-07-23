import { initFrames } from '@/features/frame/state/frameSlice';
import { initSettings } from '@/features/settings/state/settingsSlice';
import { initTools } from '@/features/tool/state/toolSlice';
import { initLayers } from '@/features/layer/state/layerSlice';
import { App } from '../../../app/App';
import { useEffect, useRef, useState } from 'react';
import { store } from '@/utils/store';

const useInitApp = (appContext: App, canvasNode?: HTMLCanvasElement) => {
  const [isModuleInitialized, setIsModuleInitialized] = useState(false);

  const isEditorInitialized = useRef<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isEditorInitialized.current && editor && canvasNode) {
      const script = document.createElement('script');
      script.src = process.env.RENDER_EXTERNAL_URL + '/spright.js';
      script.async = true;
      document.body.appendChild(script);

      isEditorInitialized.current = true;
    }

    if (window?.Module?.isRuntimeInitialized && !isModuleInitialized) {
      setIsModuleInitialized(true);

      store.dispatch(initFrames(appContext.editorApi));
      store.dispatch(initLayers(appContext.editorApi));
      store.dispatch(initTools(appContext.editorApi));

      const canvasSize = JSON.parse(appContext.editorApi.getCanvasSize());
      store.dispatch(initSettings({ canvasSize }));
    }
  });

  return {
    isModuleInitialized,
  };
};

export default useInitApp;
