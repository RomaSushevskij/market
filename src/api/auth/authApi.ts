import {
  applyActionCode,
  browserSessionPersistence,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { ResetPasswordPayload } from 'api/auth/types';
import { SignInFormValuesType } from 'components';
import { app } from 'services/firebase';
import { SignUpDataType } from 'store/reducers';

const auth = getAuth(app);

export const authApi = {
  async signUp(signUpData: SignUpDataType) {
    const { email, password } = signUpData;

    await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  },
  async signIn(signUpData: SignInFormValuesType) {
    const { email, password, rememberMe } = signUpData;

    if (!rememberMe) {
      await setPersistence(auth, browserSessionPersistence);
    }
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
  },
  async signOut() {
    await signOut(auth);
  },
  async sendPasswordResetEmail(email: string) {
    await sendPasswordResetEmail(auth, email);
  },
  async resetPassword(resetPasswordPayload: ResetPasswordPayload) {
    const { oobCode, newPassword } = resetPasswordPayload;

    await confirmPasswordReset(auth, oobCode, newPassword);
  },
  async verifyEmail(oobCode: string) {
    await applyActionCode(auth, oobCode);
  },
};
