export enum AUTH_PAGE_MESSAGES {
  INVALID_PASSWORD = 'auth/wrong-password',
  USER_DELETED = 'auth/user-not-found',
  NETWORK_REQUEST_FAILED = 'auth/network-request-failed',
  EMAIL_EXISTS = 'auth/email-already-in-use',
  NEED_VERIFY_ACCOUNT = 'You need to verify your email address to activate your account',
  LOGGED_IN_SUCCESSFULLY = 'Logged in successfully',
  INVALID_OOB_CODE = 'auth/invalid-action-code',
}

export const reduceErrorMessage = (serverMessage: AUTH_PAGE_MESSAGES): string => {
  switch (serverMessage) {
    case AUTH_PAGE_MESSAGES.INVALID_PASSWORD: {
      return 'Incorrect password';
    }
    case AUTH_PAGE_MESSAGES.USER_DELETED: {
      return 'User with this email address not found';
    }
    case AUTH_PAGE_MESSAGES.INVALID_OOB_CODE: {
      return 'The link to reset is invalid. This can happen if the link is malformed, expired, or has already been used';
    }
    case AUTH_PAGE_MESSAGES.NETWORK_REQUEST_FAILED: {
      return 'Network error';
    }
    case AUTH_PAGE_MESSAGES.EMAIL_EXISTS: {
      return 'The email address is already in use by another account';
    }
    default:
      return 'Some error occurred';
  }
};
