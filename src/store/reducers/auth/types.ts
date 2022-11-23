import { RequestStatusType } from '../products/types';

import { SignInFormValuesType } from 'components';

export type AuthInitialStateType = {
  isAuth: boolean;
  email: string | null;
  name: string | null;
  status: RequestStatusType;
  authPageMessage: string | null;
};

export type SignUpDataType = Omit<SignInFormValuesType, 'rememberMe'>;
