import React from 'react';

import './App.module.scss';
import Container from '@mui/material/Container';

import { Header } from 'components';
import { AppRoutes } from 'components/appRoutes/Routes';

const App = () => {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ padding: 2, minHeight: 'calc(100vh - 64px)' }}>
        <AppRoutes />
      </Container>
    </>
  );
};

export default App;
