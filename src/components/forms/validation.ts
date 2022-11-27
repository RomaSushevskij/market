import { object, ref, SchemaOf, string } from 'yup';

import { OrderFormValuesType } from './orderForm/types';
import { PasswordRecoveryFormValuesType } from './passwordRecovery';
import { SignUpFormValuesType } from './registrationForm';

import { SignInFormValuesType } from 'components/forms/loginForm/types';

const endPoints = {
  passwordMin: 7,
};

export const SignInSchema: SchemaOf<Omit<SignInFormValuesType, 'rememberMe'>> =
  object().shape({
    email: string().required('Field is required').email('Invalid email address'),
    password: string().required('Field is required'),
  });

export const SignUpSchema: SchemaOf<SignUpFormValuesType> = object().shape({
  email: string().required('Field is required').email('Invalid email address'),
  password: string()
    .required('Field is required')
    .min(endPoints.passwordMin, 'The password field must be at least 6 character'),
  confirmPassword: string()
    .required('Field is required')
    .oneOf([ref('password'), null], 'The password confirmation does not match'),
});

export const InstructionsSendSchema: SchemaOf<{ email: string }> = object().shape({
  email: string().required('Field is required').email('Invalid email address'),
});

export const PasswordRecoverySchema: SchemaOf<PasswordRecoveryFormValuesType> =
  object().shape({
    newPassword: string()
      .required('Field is required')
      .min(endPoints.passwordMin, 'The password field must be at least 6 character'),
    confirmNewPassword: string()
      .required('Field is required')
      .oneOf([ref('newPassword'), null], 'The password confirmation does not match'),
  });

export const OrderSchema: SchemaOf<OrderFormValuesType> = object().shape({
  name: string().required('Field is required'),
  surname: string().required('Field is required'),
  address: string().required('Field is required'),
  phone: string().required('Field is required'),
});
