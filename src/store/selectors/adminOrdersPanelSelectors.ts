import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';
import { AppStateType } from 'store/types';

export const selectAdminOrders = (state: AppStateType): AdminOrder[] =>
  state.adminOrders.orders;
