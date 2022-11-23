export enum AUTH_ERROR_CODES {
  INVALID_PASSWORD = 'Firebase: Error (auth/wrong-password).',
  USER_DELETED = 'Firebase: Error (auth/user-not-found).',
  NETWORK_REQUEST_FAILED = 'Firebase: Error (auth/network-request-failed).',
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
    default:
      return 'Some error occurred';
  }
};
