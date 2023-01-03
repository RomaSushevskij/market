import { RequestStatusType } from 'store/reducers';
import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';
import { AppStateType } from 'store/types';

export const selectAdminOrders = (state: AppStateType): AdminOrder[] =>
  state.adminOrders.orders;
export const selectAdminOrdersStatus = (state: AppStateType): RequestStatusType =>
  state.adminOrders.adminOrdersStatus;
export const selectAdminOrdersCurrentPage = (state: AppStateType): number =>
  state.adminOrders.currentPage;
export const selectAdminOrdersPageSize = (state: AppStateType): number =>
  state.adminOrders.pageSize;
export const selectAdminOrdersTotalCount = (state: AppStateType): number =>
  state.adminOrders.ordersTotalCount;
