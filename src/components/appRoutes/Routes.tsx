import { Route, Routes } from 'react-router-dom';

import { Products } from 'pages';
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
      <Route path="/" element={<Products />} />
      <Route path="*" element={<Products />} />
    </Routes>
  );
};
