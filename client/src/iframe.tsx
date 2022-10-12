import React from 'react';
import ReactDOM from 'react-dom';
import IframeEntry from './ui/root/IframeEntry';

function renderApp() {
  ReactDOM.render(<IframeEntry />, document.getElementById('root'));
}

renderApp();

window.renderApp = renderApp;
