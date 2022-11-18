import { AUTH_PAGE_DEEP_ROUTE, ORDER_LIST_ROUTE, PRODUCTS_ROUTE } from 'appConstants';
import { RouteType } from 'components/appRoutes/types';
import { OrderList, Products } from 'pages';
import { AuthPage } from 'pages/authPage/authPage';

export const privateRoutes: RouteType[] = [
  {
    path: PRODUCTS_ROUTE,
    component: <Products />,
  },
  {
    path: ORDER_LIST_ROUTE,
    component: <OrderList />,
  },
];

export const publicRoutes: RouteType[] = [
  {
    path: AUTH_PAGE_DEEP_ROUTE,
    component: <AuthPage />,
  },
];
