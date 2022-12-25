import CanvasEventHandler from '@/services/canvas/CanvasEventHandler';
import ToolStore from '@/panels/toolbar/ToolStore';
import { createContext } from 'react';
import ModuleManager from '@/core/ModuleManager';
import KeyboardHandler from '@/services/keyboard/KeyboardHandler';
import LifeCycleEventHandler from '@/services/core/LifeCycleEventHandler';
import Editor from '@/services/native/Editor';
import WindowHandler from '@/services/core/WindowHandler';
import LayerHandler from '@/panels/layer/model/LayerHandler';
import Settings from '@/services/settings/Settings';

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

export const AppContext = createContext<App | undefined>(undefined);

export default App;
