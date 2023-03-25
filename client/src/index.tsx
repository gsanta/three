import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { editor } from './services/editor/Editor';
import EditorEvents from './services/editor/EditorEvents';
import KeyboardHandler from './services/keyboard/KeyboardHandler';
import AppContainer from './ui/components/AppContainer';
import App from './app/App';
import ToolEventListener from './panels/toolbar/ToolEventListener';

// embinds uses this global state
window.EditorEvents = new EditorEvents();

const app: App = {
  editorApi: editor,
  editorEvents: window.EditorEvents,
  keyboardHandler: new KeyboardHandler(),
};

const toolEventListener = new ToolEventListener(app.editorApi);
toolEventListener.listen(app.editorEvents);

let root: Root;

function renderApp() {
  const container = document.getElementsByTagName('body')[0];

  if (!container) {
    throw new Error('Container does not exists');
  }

  if (!root) {
    root = createRoot(container);
  }

  root.render(<AppContainer app={app} />);
}

renderApp();

window.renderApp = renderApp;
