import { object, SchemaOf, string } from 'yup';

import { SignInFormValuesType } from 'components/forms/loginForm/types';

// const endPoints = {
//   passwordMin: 7,
// };

export const SignInSchema: SchemaOf<Omit<SignInFormValuesType, 'rememberMe'>> =
  object().shape({
    email: string().required('Field is required').email('Invalid email address'),
    password: string().required('Field is required'),
  });
