import { RouteType } from 'components/appRoutes/types';
import { adminRoutes, routes } from 'enums';
import { OrderList, Products } from 'pages';
import { ProductsPanel } from 'pages/admin';
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
  {
    path: routes.ROOT,
    component: <Products />,
  },
  {
    path: routes.DEFAULT,
    component: <Products />,
  },
];

export const publicRoutes: RouteType[] = [
  {
    path: routes.AUTH_PAGE_DEEP,
    component: <AuthPage />,
  },
];

export const adminPrivateRoutes: RouteType[] = [
  { path: adminRoutes.PRODUCTS, component: <ProductsPanel /> },
  {
    path: routes.ROOT,
    component: <ProductsPanel />,
  },
  {
    path: routes.DEFAULT,
    component: <ProductsPanel />,
  },
];
