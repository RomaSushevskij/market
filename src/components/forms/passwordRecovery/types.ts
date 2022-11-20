import { SignUpFormValuesType } from '../registrationForm';

export type PasswordRecoveryFormValuesType = Omit<SignUpFormValuesType, 'email'>;
