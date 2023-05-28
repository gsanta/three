import EditorEvents from '@/features/editor/EditorEvents';
import { createContext } from 'react';
import KeyboardHandler from '@/features/keyboard/KeyboardHandler';
import Editor from '@/features/editor/Editor';

export type App = {
  editorApi: Editor;
  editorEvents: EditorEvents;
  keyboardHandler: KeyboardHandler;
};

export const AppContext = createContext<App | undefined>(undefined);

export default App;
