export enum AUTH_ERROR_CODES {
  INVALID_PASSWORD = 'auth/wrong-password',
  USER_DELETED = 'auth/user-not-found',
  NETWORK_REQUEST_FAILED = 'auth/network-request-failed',
  EMAIL_EXISTS = 'auth/email-already-in-use',
}

export const reduceErrorMessage = (serverMessage: AUTH_ERROR_CODES): string => {
  switch (serverMessage) {
    case AUTH_ERROR_CODES.INVALID_PASSWORD: {
      return 'Incorrect password';
    }
    case AUTH_ERROR_CODES.USER_DELETED: {
      return 'User with this email address not found';
    }
    case AUTH_ERROR_CODES.NETWORK_REQUEST_FAILED: {
      return 'Network error';
    }
    case AUTH_ERROR_CODES.EMAIL_EXISTS: {
      return 'The email address is already in use by another account';
    }
    default:
      return 'Some error occurred';
  }
};
