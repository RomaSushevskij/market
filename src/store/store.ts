import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { adminPanelProductsReducer } from 'store/reducers';
import { appReducer } from 'store/reducers/app';
import { authReducer } from 'store/reducers/auth/authReducer';
import { ordersReducer } from 'store/reducers/orders/ordersReducer';
import { productsReducer } from 'store/reducers/products/productsReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  products: productsReducer,
  orders: ordersReducer,
  auth: authReducer,
  adminPanelProducts: adminPanelProductsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});

// @ts-ignore
window.store = store;
