import { RouteType } from 'components/appRoutes/types';
import { routes } from 'enums';
import { CartOrderList, Products } from 'pages';
import { AuthPage } from 'pages/authPage/authPage';
import { UserProfile } from 'pages/userProfile/userProfile';

export const privateRoutes: RouteType[] = [
  {
    path: routes.ROOT,
    component: <Products />,
  },
  {
    path: routes.DEFAULT,
    component: <Products />,
  },
  {
    path: routes.PRODUCTS,
    component: <Products />,
  },
  {
    path: routes.CART_ORDER_LIST,
    component: <CartOrderList />,
  },
  { path: routes.USER_PROFILE, component: <UserProfile /> },
];

export const publicRoutes: RouteType[] = [
  {
    path: routes.AUTH_PAGE_DEEP,
    component: <AuthPage />,
  },
];
