import { RequestStatusType } from 'store/reducers';
import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';
import { AppStateType } from 'store/types';

export const selectAdminOrders = (state: AppStateType): AdminOrder[] =>
  state.adminOrders.orders;
export const selectAdminOrdersStatus = (state: AppStateType): RequestStatusType =>
  state.adminOrders.adminOrdersStatus;
