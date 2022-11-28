import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { loadState, saveState } from 'services/localStorage';
import { appReducer } from 'store/reducers/app';
import { authReducer } from 'store/reducers/auth/authReducer';
import { ordersReducer } from 'store/reducers/orders/ordersReducer';
import { productsReducer } from 'store/reducers/products/productsReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  products: productsReducer,
  orders: ordersReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
  preloadedState: loadState(),
});

store.subscribe(() => {
  const { products, orders, app, auth } = store.getState();

  saveState({
    orders,
    auth,
    app,
    products,
  });
});

// @ts-ignore
window.store = store;
