import React, { FC, useCallback } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Preloader } from 'components';
import { AdminAppRoutes } from 'components/admin';
import { AdminHeader } from 'components/admin/adminHeader/adminHeader';
import { SnackBar } from 'components/snackBar';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setAuthPageMessage } from 'store/reducers';
import { selectAuthMessage, selectIsInitialize } from 'store/selectors';
import { selectIsAdminAuth } from 'store/selectors/adminAuthSelectors';

export const AdminApp: FC = () => {
  const dispatch = useAppDispatch();

  const isAdminAuth = useAppSelector(selectIsAdminAuth);
  const isInitialized = useAppSelector(selectIsInitialize);
  const authPageMessage = useAppSelector(selectAuthMessage);

  const minHeight = isAdminAuth ? 'calc(100vh - 80px)' : '100vh';

  const onSnackBarClose = useCallback(
    (closeValue: null) => {
      dispatch(setAuthPageMessage(closeValue));
    },
    [dispatch],
  );

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
      {authPageMessage && (
        <SnackBar
          message={authPageMessage.message}
          severity={authPageMessage.severity}
          autoHideDuration={7000}
          onClose={onSnackBarClose}
        />
      )}
    </>
  );
};
