import EditorStore from '@/services/EditorStore';
import ExternalEventHandler from '@/services/ExternalEventHandler';
import ToolStore from '@/services/tool/ToolStore';
import { createContext } from 'react';

type EditorContextType = {
  toolStore: ToolStore;
  editorStore: EditorStore;
  externalEventHandler: ExternalEventHandler;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export default EditorContext;
