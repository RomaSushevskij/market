import React from 'react';

import { initializeApp } from 'firebase/app';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from 'store';

const firebaseConfig = {
  apiKey: 'AIzaSyDm7qwMaMtXUcdQ3mnWx0GQN7bICl4x4yI',
  authDomain: 'test-market-84710.firebaseapp.com',
  projectId: 'test-market-84710',
  storageBucket: 'test-market-84710.appspot.com',
  messagingSenderId: '465579776322',
  appId: '1:465579776322:web:254f91bcb0094f8e3290db',
};

const app = initializeApp(firebaseConfig);

console.log(app);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);

reportWebVitals();
