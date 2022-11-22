import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { SignUpDataType } from 'store/reducers';

const MS = 500;
const testValue1 = 100;
const testValue2 = 5;

export const authApi = {
  async signUp(signUpData: SignUpDataType) {
    const { email, password } = signUpData;

    try {
      const auth = getAuth();

      return createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
    }
  },
  async signIn() {
    return new Promise((res, rej) => {
      if (MS / testValue1 === testValue2) setTimeout(res, MS);
      setTimeout(rej, MS, { message: 'Some error occurred' });
    });
  },
};
