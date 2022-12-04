import { OrderType } from 'store/reducers';

export const setOrderListToLocalStorage = (
  orderList: OrderType[],
  uid: string | null,
) => {
  if (uid) {
    try {
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
