import React, { FC, memo, SyntheticEvent, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

import {
  AUTH_PASSWORD_RECOVERY_ROUTE,
  AUTH_SEND_INSTRUCTIONS_ROUTE,
  AUTH_SIGN_IN_ROUTE,
  AUTH_SIGN_UP_ROUTE,
} from 'appConstants';
import {
  LoginForm,
  PasswordInstructionsSend,
  PasswordRecoveryForm,
  RegistrationForm,
} from 'components/forms';
import { authForms, AuthTabsValueType } from 'pages/authPage';

export const AuthPage: FC = memo(() => {
  const navigate = useNavigate();
  const params = useParams();

  const [tabValue, setTabValue] = useState<AuthTabsValueType>(authForms.SIGN_IN);
  const [isShowTabs, setShowTabs] = useState(false);

  const onTabsChange = (event: SyntheticEvent, newTabValue: AuthTabsValueType) => {
    if (newTabValue === authForms.SIGN_IN) navigate(AUTH_SIGN_IN_ROUTE);
    if (newTabValue === authForms.SIGN_UP) navigate(AUTH_SIGN_UP_ROUTE);
  };

  useEffect(() => {
    if (!params['*']) navigate(AUTH_SIGN_IN_ROUTE);
  }, [params]);

  useEffect(() => {
    if (params['*'] === AUTH_SIGN_IN_ROUTE) setTabValue(authForms.SIGN_IN);

    if (params['*'] === AUTH_SIGN_UP_ROUTE) setTabValue(authForms.SIGN_UP);
  }, [params]);

  useEffect(() => {
    if (params['*'] === AUTH_SIGN_IN_ROUTE || params['*'] === AUTH_SIGN_UP_ROUTE) {
      setShowTabs(true);

      return;
    }
    setShowTabs(false);
  }, [params]);

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
            {isShowTabs && (
              <Box mb={2}>
                <Tabs value={tabValue} onChange={onTabsChange}>
                  <Tab value={authForms.SIGN_IN} label={authForms.SIGN_IN} />
                  <Tab value={authForms.SIGN_UP} label={authForms.SIGN_UP} />
                </Tabs>
              </Box>
            )}
            <Routes>
              <Route path={AUTH_SIGN_IN_ROUTE} element={<LoginForm />} />
              <Route path={AUTH_SIGN_UP_ROUTE} element={<RegistrationForm />} />
              <Route
                path={AUTH_SEND_INSTRUCTIONS_ROUTE}
                element={<PasswordInstructionsSend />}
              />
              <Route
                path={AUTH_PASSWORD_RECOVERY_ROUTE}
                element={<PasswordRecoveryForm />}
              />
            </Routes>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
});
