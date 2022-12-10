import { RequestStatusType } from 'store/reducers';
import { AppStateType } from 'store/types';
import { AlertNotification } from 'types';

export const selectAdminProductsPageMessage = (
  state: AppStateType,
): AlertNotification | null => state.adminPanelProducts.adminProductsPageMessage;
export const selectAdminProductsStatus = (state: AppStateType): RequestStatusType =>
  state.adminPanelProducts.adminProductsStatus;
export const selectAdminProductsTotalCount = (state: AppStateType): number =>
  state.adminPanelProducts.adminProductsTotalCount;
export const selectAdminPageSize = (state: AppStateType): number =>
  state.adminPanelProducts.adminPageSize;
export const selectAdminCurrentPage = (state: AppStateType): number =>
  state.adminPanelProducts.adminCurrentPage;
