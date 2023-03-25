import EditorEvents from '@/services/editor/EditorEvents';
import { createContext } from 'react';
import KeyboardHandler from '@/services/keyboard/KeyboardHandler';
import Editor from '@/services/editor/Editor';

export type App = {
  editorApi: Editor;
  editorEvents: EditorEvents;
  keyboardHandler: KeyboardHandler;
};

export const AppContext = createContext<App | undefined>(undefined);

export default App;
