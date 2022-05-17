import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import './index.css';
import App from './components/App/App';
import { store } from '../src/services/store.js';

ReactDOM.render(
  <React.StrictMode>

    <Router>
      <Provider store={store}>


        <App />
      </Provider>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);