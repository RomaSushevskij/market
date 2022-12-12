import React, { FC } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Preloader } from 'components';
import { AdminAppRoutes } from 'components/admin';
import { AdminHeader } from 'components/admin/adminHeader/adminHeader';
import { useAppSelector } from 'hooks';
import { selectIsInitialize } from 'store/selectors';
import { selectIsAdminAuth } from 'store/selectors/adminAuthSelectors';

export const AdminApp: FC = () => {
  const isAdminAuth = useAppSelector(selectIsAdminAuth);
  const isInitialized = useAppSelector(selectIsInitialize);

  const minHeight = isAdminAuth ? 'calc(100vh - 80px)' : '100vh';

  if (!isInitialized)
    return (
      <Grid container justifyContent="space-around">
        <Preloader />
      </Grid>
    );

  return (
    <>
      {isAdminAuth && <AdminHeader />}
      <Container maxWidth="md" sx={{ padding: 2, minHeight }}>
        <AdminAppRoutes />
      </Container>
    </>
  );
};
