import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/components/App';

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp();

window.renderApp = renderApp;
