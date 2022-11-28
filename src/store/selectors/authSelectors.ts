import { AppStateType } from '../types';

export const selectIsAuth = (state: AppStateType) => state.auth.isAuth;
export const selectAuthMessage = (state: AppStateType) => state.auth.authPageMessage;
export const selectAuthPageStatus = (state: AppStateType) => state.auth.status;
export const selectUid = (state: AppStateType) => state.auth.uid;
