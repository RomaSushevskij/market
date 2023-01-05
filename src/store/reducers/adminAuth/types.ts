import { RequestStatusType } from 'store/reducers/products/types';
import { AlertNotification } from 'types';

export type AdminAuthInitialState = {
  isAdminAuth: boolean;
  adminName: string | null;
  photoURL: string | null;
  adminAuthStatus: RequestStatusType;
  adminAuthPageMessage: AlertNotification | null;
  adminEmail: string | null;
};
