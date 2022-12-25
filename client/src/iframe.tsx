import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import LayerHandler from './panels/layer/model/LayerHandler';
import ToolStore from './panels/toolbar/ToolStore';
import WindowHandler from './services/editor/WindowHandler';
import KeyboardHandler from './services/keyboard/KeyboardHandler';
import { editor } from './services/editor/Editor';
import Settings from './services/settings/Settings';
import IframeEntry from './ui/root/IframeEntry';
import EditorEvents from './services/editor/EditorEvents';
import App from './app/App';
import ModuleManager from './app/ModuleManager';

let root: Root;

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

function renderApp() {
  const container = document.getElementById('root');

  if (!container) {
    throw new Error('Container does not exists');
  }

  if (!root) {
    root = createRoot(container);
  }

  root.render(<IframeEntry />);
}

renderApp();

window.renderApp = renderApp;
