import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from 'store';
import './services/firebase';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);

reportWebVitals();
