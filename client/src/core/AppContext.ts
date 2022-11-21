import EditorStore from '@/services/EditorStore';
import CanvasEventHandler from '@/services/canvas/CanvasEventHandler';
import ToolStore from '@/services/tool/ToolStore';
import { createContext } from 'react';
import ModuleManager from '@/core/ModuleManager';
import KeyboardHandler from '@/services/keyboard/KeyboardHandler';
import LifeCycleEventHandler from '@/services/core/LifeCycleEventHandler';
import EditorApi from '@/services/api/EditorApi';
import WindowHandler from '@/services/core/WindowHandler';
import LayerHandler from '@/ui/panels/layer/LayerHandler';

export type AppContextType = {
  editorApi: EditorApi;
  toolStore: ToolStore;
  editorStore: EditorStore;
  canvasEventHandler: CanvasEventHandler;
  lifeCycleEventHandler: LifeCycleEventHandler;
  moduleManager: ModuleManager;
  keyboardHandler: KeyboardHandler;
  windowHandler: WindowHandler;
  layerHandler: LayerHandler;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
