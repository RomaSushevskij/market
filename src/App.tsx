import React, { useEffect } from 'react';

import './App.module.scss';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { Header, Preloader } from 'components';
import { AppRoutes } from 'components/appRoutes/Routes';
import { useAppDispatch, useAppSelector } from 'hooks';
import { initializeApp, setUserAuth } from 'store/reducers';
import { selectIsAuth, selectIsInitialize } from 'store/selectors';

const App = () => {
  const dispatch = useAppDispatch();

  const isInitialized = useAppSelector(selectIsInitialize);

  const isAuth = useAppSelector(selectIsAuth);
  const minHeight = isAuth ? 'calc(100vh - 80px)' : '100vh';

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, user => {
      if (user) {
        const { email, displayName } = user;

        dispatch(setUserAuth({ email, displayName }));
      }
      dispatch(initializeApp());
    });
  }, []);

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
    </>
  );
};

export default App;
