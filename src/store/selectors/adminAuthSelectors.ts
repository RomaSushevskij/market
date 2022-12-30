import { AppStateType } from 'store/types';

export const selectIsAdminAuth = (state: AppStateType): boolean =>
  state.adminAuth.isAdminAuth;
export const selectIsAdminEmail = (state: AppStateType): string | null =>
  state.adminAuth.adminEmail;
