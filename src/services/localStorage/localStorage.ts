import { AppStateType } from 'store';
import {
  getInitialAuthState,
  getInitialOrderState,
  getInitialProductState,
} from 'store/reducers';

export const saveState = (state: AppStateType) => {
  try {
    const orderListState: AppStateType = {
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
