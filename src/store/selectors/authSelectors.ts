import { AppStateType } from '../types';

export const selectIsAuth = (state: AppStateType) => state.auth.isAuth;
export const selectAuthMessage = (state: AppStateType) => state.auth.authPageMessage;
export const selectAuthPageStatus = (state: AppStateType) => state.auth.status;
export const selectUid = (state: AppStateType) => state.auth.uid;
export const selectEmail = (state: AppStateType) => state.auth.email;
export const selectPhotoURL = (state: AppStateType): string | null => state.auth.photoURL;
export const selectUserName = (state: AppStateType): string | null => state.auth.name;
export const selectUserId = (state: AppStateType): string | null => state.auth.uid;
