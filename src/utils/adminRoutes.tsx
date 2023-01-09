import { RouteType } from 'components';
import { adminRoutes } from 'enums';
import { AdminProductsPanel } from 'pages/admin';
import { AdminAuthPage } from 'pages/admin/adminAuthPage/adminAuthPage';
import { AdminOrdersPanel } from 'pages/admin/adminOrdersPanel';
import { AdminUsersPanel } from 'pages/admin/adminUsersPanel/adminUsersPanel';

export const adminPrivateRoutes: RouteType[] = [
  { path: adminRoutes.PRODUCTS, component: <AdminProductsPanel /> },
  { path: adminRoutes.ORDERS, component: <AdminOrdersPanel /> },
  { path: adminRoutes.USERS, component: <AdminUsersPanel /> },
  { path: adminRoutes.AUTH_PAGE, component: <AdminAuthPage /> },
  {
    path: adminRoutes.ROOT,
    component: <AdminProductsPanel />,
  },
  {
    path: adminRoutes.DEFAULT,
    component: <AdminProductsPanel />,
  },
];
