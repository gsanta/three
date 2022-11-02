import EditorStore from '@/services/EditorStore';
import CanvasEventHandler from '@/services/canvas/CanvasEventHandler';
import ToolStore from '@/services/tool/ToolStore';
import { createContext } from 'react';
import { CanvasService } from '@/services/CanvasService';
import ModuleManager from '@/global/ModuleManager';

export type AppContextType = {
  toolStore: ToolStore;
  editorStore: EditorStore;
  canvasService: CanvasService;
  externalEventHandler: CanvasEventHandler;
  moduleManager: ModuleManager;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
