import React, { FC, memo } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Navigate } from 'react-router-dom';

import { LoginForm } from 'components';
import { useAppSelector } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { authForms } from 'pages/authPage';
import { selectIsAdminAuth } from 'store/selectors/adminAuthSelectors';

export const AdminAuthPage: FC = memo(() => {
  const { primaryColor } = usePalette();

  const isAdminAuth = useAppSelector(selectIsAdminAuth);

  if (isAdminAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Grid
      container
      sx={{ height: 'calc(100vh - 120px)' }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item sx={{ width: 400 }}>
        <Paper sx={{ p: 4 }}>
          <Box width="100%">
            <Typography variant="h6" component="div" color={primaryColor}>
              {authForms.SIGN_IN}
            </Typography>
            <LoginForm />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
});
