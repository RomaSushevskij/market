import { AppStateType } from 'store/types';

export const selectIsInitialize = (state: AppStateType) => state.app.isInitialized;
