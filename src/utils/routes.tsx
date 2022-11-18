import {LOGIN_PAGE_ROUTE, ORDER_LIST_ROUTE, PRODUCTS_ROUTE} from 'appConstants';
import { RouteType } from 'components/appRoutes/types';
import { OrderList, Products } from 'pages';
import {LoginPage} from "../pages/loginPage/loginPage";

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
    path: LOGIN_PAGE_ROUTE,
    component: <LoginPage />
  }
]
