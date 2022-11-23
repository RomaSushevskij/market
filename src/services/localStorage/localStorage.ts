import { AppStateType } from 'store';
import {
  getInitialAuthState,
  getInitialOrderState,
  getInitialProductState,
} from 'store/reducers';
import { getInitialAppState } from 'store/reducers/app';

export const saveState = (state: AppStateType) => {
  try {
    const orderListState: AppStateType = {
      app: getInitialAppState(),
      auth: getInitialAuthState(),
      products: getInitialProductState(),
      orders: { ...getInitialOrderState(), orderList: state.orders.orderList },
    };
    const serializedState = JSON.stringify(orderListState);

    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
