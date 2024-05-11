import ExportJson from '@/client/editor/controllers/io/ExportJson';
import ImportJson from '@/client/editor/controllers/io/ImportJson';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import KeyboardService from '@/client/editor/services/KeyboardService';
import ToolService from '@/client/editor/services/ToolService';
import { createContext, useContext } from 'react';

export type EditorContextType = {
  tool: ToolService;
  keyboard: KeyboardService;
  exporter: ExportJson;
  importer: ImportJson;
  scene: SceneStore;
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
