import React, { FC, memo, SyntheticEvent, useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import {
  LoginForm,
  PasswordInstructionsSend,
  PasswordRecoveryForm,
  RegistrationForm,
} from 'components/forms';
import { SnackBar } from 'components/snackBar';
import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { authForms, AuthTabsValueType } from 'pages/authPage';
import { setAuthPageMessage } from 'store/reducers';
import { selectAuthMessage, selectIsAuth } from 'store/selectors';

export const AuthPage: FC = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const isAuth = useAppSelector(selectIsAuth);
  const authPageMessage = useAppSelector(selectAuthMessage);

  const [tabValue, setTabValue] = useState<AuthTabsValueType>(authForms.SIGN_IN);
  const [isShowTabs, setShowTabs] = useState(false);

  const onTabsChange = (event: SyntheticEvent, newTabValue: AuthTabsValueType) => {
    if (newTabValue === authForms.SIGN_IN) navigate(routes.AUTH_SIGN_IN);
    if (newTabValue === authForms.SIGN_UP) navigate(routes.AUTH_SIGN_UP);
  };

  const onSnackBarClose = useCallback((closeValue: null) => {
    dispatch(setAuthPageMessage(closeValue));
  }, []);

  useEffect(() => {
    if (!params['*']) navigate(routes.AUTH_SIGN_IN);
  }, [params]);

  useEffect(() => {
    if (params['*'] === routes.AUTH_SIGN_IN) setTabValue(authForms.SIGN_IN);

    if (params['*'] === routes.AUTH_SIGN_UP) setTabValue(authForms.SIGN_UP);
  }, [params]);

  useEffect(() => {
    if (params['*'] === routes.AUTH_SIGN_IN || params['*'] === routes.AUTH_SIGN_UP) {
      setShowTabs(true);

      return;
    }
    setShowTabs(false);
  }, [params]);

  if (isAuth) {
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
            {isShowTabs && (
              <Box mb={2}>
                <Tabs value={tabValue} onChange={onTabsChange}>
                  <Tab value={authForms.SIGN_IN} label={authForms.SIGN_IN} />
                  <Tab value={authForms.SIGN_UP} label={authForms.SIGN_UP} />
                </Tabs>
              </Box>
            )}
            <Routes>
              <Route path={routes.AUTH_SIGN_IN} element={<LoginForm />} />
              <Route path={routes.AUTH_SIGN_UP} element={<RegistrationForm />} />
              <Route
                path={routes.AUTH_SEND_INSTRUCTIONS}
                element={<PasswordInstructionsSend />}
              />
              <Route
                path={routes.AUTH_PASSWORD_RECOVERY}
                element={<PasswordRecoveryForm />}
              />
            </Routes>
          </Box>
        </Paper>
      </Grid>
      {authPageMessage && (
        <SnackBar
          message={authPageMessage.message}
          severity={authPageMessage.severity}
          autoHideDuration={7000}
          onClose={onSnackBarClose}
        />
      )}
    </Grid>
  );
});
