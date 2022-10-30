import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './ui/components/App';

window.Listener = {
  onDataChange() {
    console.log('onDataChange was called from c++!');
    return 12;
  },
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

  root.render(<App />);
}

renderApp();

window.renderApp = renderApp;
