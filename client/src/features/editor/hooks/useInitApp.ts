import { initFrames } from '@/features/frame/state/frameSlice';
import { initSettings } from '@/features/settings/state/settingsSlice';
import { initTools } from '@/features/tool/state/toolSlice';
import { initLayers } from '@/features/layer/state/layerSlice';
import { useEffect, useRef, useState } from 'react';
import { store } from '@/common/utils/store';
import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks';
import { setEditor } from '@/features/editor/editorSlice';
import Editor from '@/features/editor/Editor';
import { EditorCallbacks } from '@/features/editor/EditorCallbacks';

const loadEditor = () => {
  const script = document.createElement('script');
  script.src = process.env.RENDER_EXTERNAL_URL + '/spright.js';
  script.async = true;
  document.body.appendChild(script);
};

const useInitApp = (canvasNode?: HTMLCanvasElement) => {
  const [isModuleInitialized, setIsModuleInitialized] = useState(false);
  const dispatch = useAppDispatch();
  const editor = useAppSelector((state) => state.editor.editor);

  const isEditorInitialized = useRef<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isEditorInitialized.current && canvasNode) {
      loadEditor();

      dispatch(setEditor(window.Module as unknown as Editor));

      window.editorCallbacks = new EditorCallbacks();

      isEditorInitialized.current = true;
    }

    if (window?.Module?.isRuntimeInitialized && !isModuleInitialized) {
      setIsModuleInitialized(true);

      store.dispatch(initFrames(editor!));
      store.dispatch(initLayers(editor!));
      store.dispatch(initTools(editor!));

      const canvasSize = JSON.parse(editor!.getCanvasSize());
      store.dispatch(initSettings({ canvasSize }));
    }
  });

  return {
    isModuleInitialized,
  };
};

export default useInitApp;
