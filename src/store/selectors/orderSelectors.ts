import { OrderType } from 'store/reducers/orders/types';
import { AppStateType } from 'store/types';

export const selectorOrderList = (state: AppStateType): OrderType[] =>
  state.orders.orderList;
