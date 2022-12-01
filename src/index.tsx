import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { AdminApp } from 'AdminApp';
import { store } from 'store';
import './services/firebase';
import { defineAppType } from 'utils/defineAppType';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const appType = defineAppType();

root.render(
  <HashRouter>
    <Provider store={store}>{appType === 'adminApp' ? <AdminApp /> : <App />}</Provider>
  </HashRouter>,
);

reportWebVitals();
