import React from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { HashRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import { AppConfig } from 'AppConfig';
import './services/firebase';
import { store } from 'store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const auth = getAuth();

onAuthStateChanged(auth, user => {
  console.log(user);
  console.log(auth);
});

root.render(
  <HashRouter>
    <Provider store={store}>
      <AppConfig />
    </Provider>
  </HashRouter>,
);

reportWebVitals();
