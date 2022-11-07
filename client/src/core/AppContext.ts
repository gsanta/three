import EditorStore from '@/services/EditorStore';
import CanvasEventHandler from '@/services/canvas/CanvasEventHandler';
import ToolStore from '@/services/tool/ToolStore';
import { createContext } from 'react';
import ModuleManager from '@/core/ModuleManager';

export type AppContextType = {
  toolStore: ToolStore;
  editorStore: EditorStore;
  canvasEventHandler: CanvasEventHandler;
  moduleManager: ModuleManager;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
