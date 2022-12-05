import { SignInFormValuesType } from '../loginForm';

export type SignUpFormValuesType = Omit<SignInFormValuesType, 'rememberMe'> & {
  confirmPassword: string;
};

export type FormikFieldSignUp = keyof SignUpFormValuesType;
