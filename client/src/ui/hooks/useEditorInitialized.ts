import { EditorEventListener } from '@/services/editor/EditorEvents';
import { useEffect, useState } from 'react';
import useAppContext from './useAppContext';

const useEditorInitialized = () => {
  const { editorEvents, editorApi } = useAppContext();
  const [initialized, setInitialized] = useState(editorApi.isRuntimeInitialized);

  useEffect(() => {
    const listener: EditorEventListener = {
      onEditorInitialized() {
        if (!initialized) {
          setInitialized(true);
        }
      },
    };

    editorEvents.addListener(listener);

    return () => {
      editorEvents.removeListener(listener);
    };
  });
};

export default useEditorInitialized;
