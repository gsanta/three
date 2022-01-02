import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('../msw_mock_api/src/mocks/msw-browser');
  worker.start({ onUnhandledRequest: 'warn' });
}

axios.get("/api/v1/tdlists")
  .then((res) => {
    console.log(res);
  })
  .catch((error) => console.log(error));

ReactDOM.render(<App />, document.getElementById('root'));
