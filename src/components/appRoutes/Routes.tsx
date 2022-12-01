import { Route, Routes } from 'react-router-dom';

import { privateRoutes, publicRoutes } from 'utils/routes';

export const AppRoutes = () => {
  return (
    <Routes>
      {privateRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
      {publicRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
    </Routes>
  );
};
