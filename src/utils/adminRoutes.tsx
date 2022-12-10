import { RouteType } from 'components';
import { adminRoutes } from 'enums';
import { ProductsPanel } from 'pages/admin';

export const adminPrivateRoutes: RouteType[] = [
  { path: adminRoutes.PRODUCTS, component: <ProductsPanel /> },
  {
    path: adminRoutes.ROOT,
    component: <ProductsPanel />,
  },
  {
    path: adminRoutes.DEFAULT,
    component: <ProductsPanel />,
  },
];
