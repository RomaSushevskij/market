import React, { FC } from 'react';

import Container from '@mui/material/Container';

import { AdminAppRoutes } from 'components/admin';
import { useAppSelector } from 'hooks';
import { selectIsAuth } from 'store/selectors';

export const AdminApp: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const minHeight = isAuth ? 'calc(100vh - 80px)' : '100vh';

  return (
    <Container maxWidth="md" sx={{ padding: 2, minHeight }}>
      <AdminAppRoutes />
    </Container>
  );
};
