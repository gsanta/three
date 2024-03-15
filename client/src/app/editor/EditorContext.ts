import KeyboardService from '@/editor/features/tool/state/KeyboardService';
import ToolService from '@/editor/features/tool/state/ToolService';
import { createContext, useContext } from 'react';

export type EditorContextType = {
  tool: ToolService;
  keyboard: KeyboardService;
};

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

const useEditorContext = (): EditorContextType => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error('useEditorContext must be used within a Provider');
  }

  return context;
};

export default useEditorContext;
