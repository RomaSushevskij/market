const MS = 500;
const testValue1 = 100;
const testValue2 = 5;

export const authApi = {
  async signIn() {
    return new Promise((res, rej) => {
      if (MS / testValue1 === testValue2) setTimeout(res, MS);
      setTimeout(rej, MS, { message: 'Some error occurred' });
    });
  },
  async signPut() {
    return new Promise((res, rej) => {
      if (MS / testValue1 === testValue2) {
        setTimeout(res, MS);
      } else {
        setTimeout(rej, MS, { message: 'Some error occurred' });
      }
    });
  },
};
