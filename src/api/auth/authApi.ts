import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { app } from 'services/firebase';
import { SignUpDataType } from 'store/reducers';

const auth = getAuth(app);

export const authApi = {
  async signUp(signUpData: SignUpDataType) {
    const { email, password } = signUpData;
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    return user;
  },
  async signIn(signUpData: SignUpDataType) {
    const { email, password } = signUpData;
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
  },
  async signOut() {
    console.log('signOut');
    await signOut(auth);
  },
};
