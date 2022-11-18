import { OrderType } from 'store/reducers/orders/types';
import { AppStateType } from 'store/types';

export const selectOrderList = (state: AppStateType): OrderType[] =>
  state.orders.orderList;
export const selectOrderTotalCost = (state: AppStateType): number =>
  state.orders.orderInformation.totalCost;
