import React from 'react';

import './App.module.scss';
import Container from '@mui/material/Container';

import { useAppSelector } from './hooks';
import { selectIsAuth } from './store/selectors/authSelectors';

import { Header } from 'components';
import { AppRoutes } from 'components/appRoutes/Routes';

const App = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const minHeight = isAuth ? 'calc(100vh - 80px)' : '100vh';

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
