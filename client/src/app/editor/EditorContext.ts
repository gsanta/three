import ExportJson from '@/client/editor/services/io/ExportJson';
import ImportJson from '@/client/editor/services/io/ImportJson';
import SceneService from '@/client/editor/services/scene/SceneService';
import KeyboardService from '@/client/editor/services/tool/service/KeyboardService';
import ToolService from '@/client/editor/services/tool/service/ToolService';
import { createContext, useContext } from 'react';

export type EditorContextType = {
  tool: ToolService;
  keyboard: KeyboardService;
  exporter: ExportJson;
  importer: ImportJson;
  scene: SceneService;
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
