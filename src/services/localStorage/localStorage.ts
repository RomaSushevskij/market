import { AppStateType } from 'store';
import {
  getInitialAuthState,
  getInitialOrderState,
  getInitialProductState,
  OrderType,
} from 'store/reducers';
import { getInitialAppState } from 'store/reducers/app';

export const saveState = (state: AppStateType) => {
  try {
    // eslint-disable-next-line no-debugger
    const orderListState: AppStateType = {
      app: getInitialAppState(),
      auth: getInitialAuthState(),
      products: getInitialProductState(),
      orders: { ...getInitialOrderState(), orderList: state.orders.orderList },
    };

    const serializedState = JSON.stringify(orderListState);

    localStorage.setItem(`state`, serializedState);
  } catch {
    // ignore write errors
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(`state`);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const setOrderListToLocalStorage = (
  orderList: OrderType[],
  uid: string | null,
) => {
  if (uid) {
    try {
      console.log(orderList, uid);
      const serializedOrderList = JSON.stringify(orderList);

      localStorage.setItem(uid, serializedOrderList);
    } catch {
      // ignore write errors
    }
  }
};

export const getOrderListToLocalStorage = (uid: string): OrderType[] => {
  try {
    const serializedOrderList = localStorage.getItem(uid);

    if (serializedOrderList === null) {
      return [];
    }

    return JSON.parse(serializedOrderList);
  } catch (err) {
    return [];
  }
};
