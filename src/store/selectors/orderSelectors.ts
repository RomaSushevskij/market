import { OrderType } from 'store/reducers/orders/types';
import { AppStateType } from 'store/types';

export const selectorOrderList = (state: AppStateType): OrderType[] =>
  state.orders.orderList;
export const selectorOrderTotalCost = (state: AppStateType): number =>
  state.orders.orderInformation.totalCost;
