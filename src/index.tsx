import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { HashRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import { AppConfig } from 'AppConfig';
import './services/firebase';
import { store } from 'store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HashRouter>
    <Provider store={store}>
      <AppConfig />
    </Provider>
  </HashRouter>,
);

reportWebVitals();
