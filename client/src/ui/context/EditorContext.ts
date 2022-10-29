import EditorStore from '@/services/EditorStore';
import ToolStore from '@/services/tool/ToolStore';
import { createContext } from 'react';

type EditorContextType = {
  toolStore: ToolStore;
  editorStore: EditorStore;
};

const EditorContext = createContext<EditorContextType>({
  toolStore: new ToolStore(),
  editorStore: new EditorStore(),
});

export default EditorContext;
