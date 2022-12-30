import { Route, Routes } from 'react-router-dom';

import { routes } from 'enums';
import { ShoppingList } from 'pages/shoppingList';
import { privateRoutes, publicRoutes } from 'utils/routes';

export const AppRoutes = () => {
  return (
    <Routes>
      {privateRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
      <Route path={routes.ORDER_LIST} element={<ShoppingList isAdmin={false} />} />
      {publicRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
    </Routes>
  );
};
