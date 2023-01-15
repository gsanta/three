import { EditorEventListener } from '@/services/editor/EditorEvents';
import { useEffect, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import useAppContext from './useAppContext';

const useEditorInitialized = (callback: () => void) => {
  const { editorEvents, editorApi } = useAppContext();
  const [initialized, setInitialized] = useState(editorApi.isRuntimeInitialized);

  useEffectOnce(() => {
    if (initialized) {
      callback();
    }
  });

  useEffect(() => {
    const listener: EditorEventListener = {
      onEditorInitialized() {
        if (!initialized) {
          setInitialized(true);
          callback();
        }
      },
    };

    editorEvents.addListener(listener);

    return () => {
      editorEvents.removeListener(listener);
    };
  }, [callback, editorEvents, initialized]);
};

export default useEditorInitialized;
