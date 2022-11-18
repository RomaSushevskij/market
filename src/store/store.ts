import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { loadState, saveState } from 'services/localStorage/localStorage';
import { ordersReducer } from 'store/reducers/orders/ordersReducer';
import { productsReducer } from 'store/reducers/products/productsReducer';

export const rootReducer = combineReducers({
  products: productsReducer,
  orders: ordersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({
    orders: store.getState().orders,
    products: store.getState().products,
  });
});

// @ts-ignore
window.store = store;
