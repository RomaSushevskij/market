import { RouteType } from 'components';
import { adminRoutes } from 'enums';
import { ProductsPanel } from 'pages/admin';
import { AdminAuthPage } from 'pages/admin/adminAuthPage/adminAuthPage';
import { ShoppingList } from 'pages/shoppingList';

export const adminPrivateRoutes: RouteType[] = [
  { path: adminRoutes.PRODUCTS, component: <ProductsPanel /> },
  { path: adminRoutes.ORDERS, component: <ShoppingList isAdmin /> },
  { path: adminRoutes.USERS, component: <div>Users</div> },
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
