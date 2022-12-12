export type SignInFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type FormikFieldSignIn = keyof SignInFormValuesType;
export type LoginFormProps = {
  isAdmin: boolean;
};
