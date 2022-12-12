import React, { FC, useCallback } from 'react';

import './App.module.scss';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Header, Preloader } from 'components';
import { AppRoutes } from 'components/appRoutes/Routes';
import { SnackBar } from 'components/snackBar';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setAuthPageMessage } from 'store/reducers';
import { selectAuthMessage, selectIsAuth, selectIsInitialize } from 'store/selectors';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const isInitialized = useAppSelector(selectIsInitialize);

  const isAuth = useAppSelector(selectIsAuth);
  const authPageMessage = useAppSelector(selectAuthMessage);

  const minHeight = isAuth ? 'calc(100vh - 80px)' : '100vh';

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
      {isAuth && <Header />}
      <Container maxWidth="md" sx={{ padding: 2, minHeight }}>
        <AppRoutes />
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

export default App;
