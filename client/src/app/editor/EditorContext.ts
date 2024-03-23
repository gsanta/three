import KeyboardService from '@/editor/services/tool/service/KeyboardService';
import ToolService from '@/editor/services/tool/service/ToolService';
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
