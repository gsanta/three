import Settings from '@/services/Settings';
import CanvasEventHandler from '@/services/canvas/CanvasEventHandler';
import ToolStore from '@/services/tool/ToolStore';
import { createContext } from 'react';
import ModuleManager from '@/core/ModuleManager';
import KeyboardHandler from '@/services/keyboard/KeyboardHandler';
import LifeCycleEventHandler from '@/services/core/LifeCycleEventHandler';
import Editor from '@/services/api/Editor';
import WindowHandler from '@/services/core/WindowHandler';
import LayerHandler from '@/ui/panels/layer/LayerHandler';

export type App = {
  editorApi: Editor;
  toolStore: ToolStore;
  editorStore: Settings;
  canvasEventHandler: CanvasEventHandler;
  lifeCycleEventHandler: LifeCycleEventHandler;
  moduleManager: ModuleManager;
  keyboardHandler: KeyboardHandler;
  windowHandler: WindowHandler;
  layerHandler: LayerHandler;
};

const AppContext = createContext<App | undefined>(undefined);

export default AppContext;
