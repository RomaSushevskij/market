import { RequestStatusType } from '../products/types';

import { SignInFormValuesType } from 'components';
import { AlertNotification } from 'types';

export type AuthInitialStateType = {
  isAuth: boolean;
  email: string | null;
  name: string | null;
  status: RequestStatusType;
  authPageMessage: AlertNotification | null;
  uid: string | null;
  photoURL: string | null;
};

export type SignUpDataType = Omit<SignInFormValuesType, 'rememberMe'>;

export type SignInThunkArg = SignInFormValuesType & { isAuthForAdmin: boolean };

export type UpdateProfileReturned = {
  displayName?: string | null;
  photoURL?: string | null;
  authPageMessage: AlertNotification;
};
