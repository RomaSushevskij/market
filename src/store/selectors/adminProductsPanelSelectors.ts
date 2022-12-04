import { AppStateType } from 'store/types';
import { AlertNotification } from 'types';

export const selectAdminProductsPageMessage = (
  state: AppStateType,
): AlertNotification | null => state.adminPanelProducts.adminProductsPageMessage;
