import { RequestStatusType } from '../products/types';

import { SignInFormValuesType } from 'components';

export type AuthInitialStateType = {
  isAuth: boolean;
  email: string;
  name: string;
  status: RequestStatusType;
  authPageMessage: string | undefined;
};

export type SignUpDataType = Omit<SignInFormValuesType, 'rememberMe'>;
