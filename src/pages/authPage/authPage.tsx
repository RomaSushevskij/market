import React, { FC, memo, SyntheticEvent, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { EmailRecover } from 'components/emailRecover/emailRecover';
import { EmailVerify } from 'components/EmailVerify';
import {
  LoginForm,
  PasswordInstructionsSend,
  PasswordRecoveryForm,
  RegistrationForm,
} from 'components/forms';
import { routes } from 'enums';
import { useAppSelector } from 'hooks';
import { authForms, AuthTabsValueType } from 'pages/authPage';
import { selectIsAuth } from 'store/selectors';

export const AuthPage: FC = memo(() => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const isAuth = useAppSelector(selectIsAuth);

  const [tabValue, setTabValue] = useState<AuthTabsValueType>(authForms.SIGN_IN);
  const [isShowTabs, setShowTabs] = useState(false);

  const modeQueryParam = searchParams.get('mode');
  const oobCodeQueryParam = searchParams.get('oobCode');

  const onTabsChange = (event: SyntheticEvent, newTabValue: AuthTabsValueType) => {
    if (newTabValue === authForms.SIGN_IN) navigate(routes.AUTH_SIGN_IN);
    if (newTabValue === authForms.SIGN_UP) navigate(routes.AUTH_SIGN_UP);
  };

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

  useEffect(() => {
    if (modeQueryParam === 'verifyEmail')
      navigate(`${routes.VERIFY_EMAIL}?oobCode=${oobCodeQueryParam}`);
    if (searchParams.get('mode') === 'resetPassword')
      navigate(`${routes.AUTH_PASSWORD_RECOVERY}?oobCode=${oobCodeQueryParam}`);
    if (searchParams.get('mode') === 'recoverEmail')
      navigate(`${routes.RECOVER_EMAIL}?oobCode=${oobCodeQueryParam}`);
  }, [searchParams, modeQueryParam, oobCodeQueryParam, navigate]);

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
              <Route path={routes.AUTH_SIGN_IN} element={<LoginForm isAdmin={false} />} />
              <Route path={routes.AUTH_SIGN_UP} element={<RegistrationForm />} />
              <Route
                path={routes.AUTH_SEND_INSTRUCTIONS}
                element={<PasswordInstructionsSend />}
              />
              <Route
                path={routes.AUTH_PASSWORD_RECOVERY}
                element={<PasswordRecoveryForm />}
              />

              <Route path={routes.VERIFY_EMAIL} element={<EmailVerify />} />
              <Route path={routes.RECOVER_EMAIL} element={<EmailRecover />} />
            </Routes>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
});
