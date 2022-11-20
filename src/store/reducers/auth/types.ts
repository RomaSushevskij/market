import { RequestStatusType } from '../products/types';

export type AuthInitialStateType = {
  isAuth: boolean;
  email: string;
  name: string;
  status: RequestStatusType;
  authPageMessage: string | undefined;
};
