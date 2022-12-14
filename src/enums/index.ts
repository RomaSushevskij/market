export enum routes {
  DEFAULT = '*',
  ROOT = '/',
  PRODUCTS = '/products',
  CART_ORDER_LIST = '/cartOrderList',
  ORDER_LIST = '/orderList',
  AUTH_PAGE_DEEP = '/auth/*',
  AUTH_PAGE = '/auth',
  AUTH_SIGN_IN = 'signIn',
  ABSOLUTE_AUTH_SIGN_IN = '/signIn',
  AUTH_SIGN_UP = 'signUp',
  AUTH_SEND_INSTRUCTIONS = 'sendInstructions',
  AUTH_PASSWORD_RECOVERY = 'passwordRecovery',
  VERIFY_EMAIL = 'verifyEmail',
  RECOVER_EMAIL = 'recoverEmail',
  USER_PROFILE = '/profile',
}

export enum adminRoutes {
  PRODUCTS = '/products',
  ORDERS = '/orders',
  USERS = '/users',
  AUTH_PAGE = '/auth',
  DEFAULT = '*',
  ROOT = '/',
}

export enum AUTH_PAGE_MESSAGES {
  INVALID_PASSWORD = 'auth/wrong-password',
  USER_DELETED = 'auth/user-not-found',
  NETWORK_REQUEST_FAILED = 'auth/network-request-failed',
  EMAIL_EXISTS = 'auth/email-already-in-use',
  NEED_VERIFY_ACCOUNT = 'You need to verify your email address to activate your account',
  LOGGED_IN_SUCCESSFULLY = 'Logged in successfully',
  INVALID_OOB_CODE = 'auth/invalid-action-code',
  INVALID_ARGUMENT = 'invalid-argument',
  ACCOUNT_NOT_ADMIN = 'This account does not have admin rights',
  PROFILE_UPDATED_SUCCESSFULLY = 'Profile updated successfully',
  EMAIL_UPDATED_SUCCESSFULLY = 'Email has been changed. A letter was sent to restore the old email',
}

export enum ADMIN_PANEL_PRODUCTS_MESSAGES {
  PRODUCT_ADDED_SUCCESSFULLY = 'Product added successfully',
  NETWORK_ERROR = 'Network error',
  PRODUCT_REMOVED_SUCCESSFULLY = 'Product removed successfully',
  PRODUCT_UPDATED_SUCCESSFULLY = 'Product updated successfully',
}
export enum ADMIN_PANEL_ORDERS_MESSAGES {
  ORDER_STATUS_UPDATED_SUCCESSFULLY = 'Order status updated successfully',
  NETWORK_ERROR = 'Network error',
}
