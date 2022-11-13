import EditorStore from '@/services/EditorStore';
import CanvasEventHandler from '@/services/canvas/CanvasEventHandler';
import ToolStore from '@/services/tool/ToolStore';
import { createContext } from 'react';
import ModuleManager from '@/core/ModuleManager';
import KeyboardHandler from '@/services/keyboard/KeyboardHandler';
import LifeCycleEventHandler from '@/services/core/LifeCycleEventHandler';
import { CanvasService } from '@/services/CanvasService';
import WindowHandler from '@/services/core/WindowHandler';

export type AppContextType = {
  canvasService?: CanvasService;
  toolStore: ToolStore;
  editorStore: EditorStore;
  canvasEventHandler: CanvasEventHandler;
  lifeCycleEventHandler: LifeCycleEventHandler;
  moduleManager: ModuleManager;
  keyboardHandler: KeyboardHandler;
  windowHandler: WindowHandler;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
