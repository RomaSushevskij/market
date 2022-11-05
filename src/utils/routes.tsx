import { ORDER_LIST, PRODUCTS_ROUTE } from 'appConstants';
import { RouteType } from 'components/appRoutes/types';
import { OrderList, Products } from 'pages';

export const privateRoutes: RouteType[] = [
  {
    path: PRODUCTS_ROUTE,
    component: <Products />,
  },
  {
    path: ORDER_LIST,
    component: <OrderList />,
  },
];
