import { RequestStatusType } from 'store/reducers';

export type AppInitialStateType = {
  isInitialized: boolean;
  appMessage: string | null;
  status: RequestStatusType;
};
