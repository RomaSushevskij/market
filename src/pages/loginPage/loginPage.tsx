import React, { FC, memo } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { AuthForm, LoginForm, RegistrationForm } from 'components/forms';

export const LoginPage: FC = memo(() => {
  return (
    <Grid
      container
      sx={{ height: 'calc(100vh - 120px)' }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item sx={{ width: 400 }}>
        <Paper sx={{ p: 4 }}>
          <AuthForm />
          <LoginForm />
          <RegistrationForm />
        </Paper>
      </Grid>
    </Grid>
  );
});
