import EditorEvents from '@/services/editor/EditorEvents';
import ToolStore from '@/panels/toolbar/ToolStore';
import { createContext } from 'react';
import ModuleManager from '@/app/ModuleManager';
import KeyboardHandler from '@/services/keyboard/KeyboardHandler';
import Editor from '@/services/editor/Editor';
import WindowHandler from '@/services/editor/WindowHandler';
import LayerHandler from '@/panels/layer/model/LayerHandler';
import Settings from '@/services/settings/Settings';

export type App = {
  editorApi: Editor;
  toolStore: ToolStore;
  editorStore: Settings;
  editorEvents: EditorEvents;
  moduleManager: ModuleManager;
  keyboardHandler: KeyboardHandler;
  windowHandler: WindowHandler;
  layerHandler: LayerHandler;
};

export const AppContext = createContext<App | undefined>(undefined);

export default App;
