import React, { FC, memo } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { AuthForm } from 'components/forms';

export const AuthPage: FC = memo(() => {
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
        </Paper>
      </Grid>
    </Grid>
  );
});
