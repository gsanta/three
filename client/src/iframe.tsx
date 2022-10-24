import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import IframeEntry from './ui/root/IframeEntry';

let root: Root;

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
