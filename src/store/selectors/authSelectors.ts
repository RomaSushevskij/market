import { AppStateType } from '../types';

export const selectIsAuth = (state: AppStateType) => state.auth.isAuth;
