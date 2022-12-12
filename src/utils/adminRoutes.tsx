import { RouteType } from 'components';
import { adminRoutes } from 'enums';
import { ProductsPanel } from 'pages/admin';
import { AdminAuthPage } from 'pages/admin/adminAuthPage/adminAuthPage';

export const adminPrivateRoutes: RouteType[] = [
  { path: adminRoutes.PRODUCTS, component: <ProductsPanel /> },
  { path: adminRoutes.AUTH_PAGE, component: <AdminAuthPage /> },
  {
    path: adminRoutes.ROOT,
    component: <ProductsPanel />,
  },
  {
    path: adminRoutes.DEFAULT,
    component: <ProductsPanel />,
  },
];
