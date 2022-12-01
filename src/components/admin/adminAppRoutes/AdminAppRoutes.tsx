import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import { adminPrivateRoutes } from 'utils/routes';

export const AdminAppRoutes: FC = () => {
  return (
    <Routes>
      {adminPrivateRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
    </Routes>
  );
};
