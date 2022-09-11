import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/components/App';

declare const BACKEND_TYPE: string;

function renderApp() {
    ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp();

window.renderApp = renderApp;