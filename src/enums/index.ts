export enum routes {
  DEFAULT = '*',
  ROOT = '/',
  PRODUCTS = '/products',
  ORDER_LIST = '/orderList',
  AUTH_PAGE_DEEP = '/auth/*',
  AUTH_PAGE = '/auth',
  AUTH_SIGN_IN = 'signIn',
  ABSOLUTE_AUTH_SIGN_IN = '/signIn',
  AUTH_SIGN_UP = 'signUp',
  AUTH_SEND_INSTRUCTIONS = 'sendInstructions',
  AUTH_PASSWORD_RECOVERY = 'passwordRecovery',
  VERIFY_EMAIL = 'verifyEmail',
}

export enum adminRoutes {
  PRODUCTS = '/products',
}
