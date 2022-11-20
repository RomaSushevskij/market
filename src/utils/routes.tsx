import { RouteType } from 'components/appRoutes/types';
import { routes } from 'enums';
import { OrderList, Products } from 'pages';
import { AuthPage } from 'pages/authPage/authPage';

export const privateRoutes: RouteType[] = [
  {
    path: routes.PRODUCTS,
    component: <Products />,
  },
  {
    path: routes.ORDER_LIST,
    component: <OrderList />,
  },
];

export const publicRoutes: RouteType[] = [
  {
    path: routes.AUTH_PAGE_DEEP,
    component: <AuthPage />,
  },
];
