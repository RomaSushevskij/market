import { RequestStatusType } from 'store/reducers';
import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';
import { OrderType } from 'store/reducers/orders/types';
import { AppStateType } from 'store/types';

export const selectOrderList = (state: AppStateType): OrderType[] =>
  state.orders.cartOrderList;
export const selectOrderTotalCost = (state: AppStateType): number =>
  state.orders.cartOrderInformation.totalCost;
export const selectUserOrders = (state: AppStateType): AdminOrder[] =>
  state.orders.userOrders;
export const selectOrdersPageStatus = (state: AppStateType): RequestStatusType =>
  state.orders.ordersPageStatus;
export const selectOrdersCurrentPage = (state: AppStateType): number =>
  state.orders.currentPage;
export const selectOrdersPageSize = (state: AppStateType): number =>
  state.orders.pageSize;
export const selectOrdersTotalCount = (state: AppStateType): number =>
  state.orders.ordersTotalCount;
