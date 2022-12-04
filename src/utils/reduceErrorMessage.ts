import { AUTH_PAGE_MESSAGES } from 'enums';

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
