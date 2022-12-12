import { AppStateType } from 'store/types';

export const selectIsAdminAuth = (state: AppStateType): boolean =>
  state.adminAuth.isAdminAuth;
