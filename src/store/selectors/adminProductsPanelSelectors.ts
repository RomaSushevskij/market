import { RequestStatusType } from 'store/reducers';
import { AppStateType } from 'store/types';
import { AlertNotification } from 'types';

export const selectAdminProductsPageMessage = (
  state: AppStateType,
): AlertNotification | null => state.adminPanelProducts.adminProductsPageMessage;
export const selectAdminProductsStatus = (state: AppStateType): RequestStatusType =>
  state.adminPanelProducts.adminProductsStatus;
