import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { editor } from './services/editor/Editor';
import EditorEvents from './services/editor/EditorEvents';
import WindowHandler from './services/editor/WindowHandler';
import KeyboardHandler from './services/keyboard/KeyboardHandler';
import ToolStore from './panels/toolbar/ToolStore';
import AppContainer from './ui/components/AppContainer';
import LayerHandler from './panels/layer/model/LayerHandler';
import Settings from './services/settings/Settings';
import App from './app/App';
import ModuleManager from './app/ModuleManager';

const app: App = {
  editorApi: editor,
  toolStore: new ToolStore(),
  editorStore: new Settings(editor),
  editorEvents: new EditorEvents(),
  moduleManager: new ModuleManager(),
  keyboardHandler: new KeyboardHandler(),
  windowHandler: new WindowHandler(),
  layerHandler: new LayerHandler(editor),
};

let root: Root;

function renderApp() {
  const container = document.getElementById('root');

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
