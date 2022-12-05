import { FC, useState } from 'react';

import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';

import { Notification } from 'components/forms/passwordRecovery/Notification';
import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { verifyEmail } from 'store/reducers';
import { selectAuthPageStatus } from 'store/selectors';

export const EmailVerify: FC = () => {
  const dispatch = useAppDispatch();
  const { primaryColor, successColor } = usePalette();
  const [searchParams] = useSearchParams();

  const [isVerifyEmail, setVerifyEmail] = useState(false);

  const authPageStatus = useAppSelector(selectAuthPageStatus);

  const oobCode = searchParams.get('oobCode') || '';

  const onVerifyEmailClick = async () => {
    const resultAction = await dispatch(verifyEmail(oobCode));

    if (verifyEmail.fulfilled.match(resultAction)) {
      setVerifyEmail(true);
    }
  };

  if (isVerifyEmail) {
    return (
      <Notification
        icon={<MarkEmailReadIcon sx={{ fontSize: 100, color: successColor }} />}
        title="Your email address has been verified."
        linkTitle="Try logging in"
        linkPath={routes.ABSOLUTE_AUTH_SIGN_IN}
      />
    );
  }

  return (
    <Box textAlign="center">
      <Notification
        icon={<PrivacyTipIcon sx={{ fontSize: 100, color: successColor }} />}
        title="Please verify your email"
      />
      <LoadingButton
        loading={authPageStatus === 'loading'}
        onClick={onVerifyEmailClick}
        variant="outlined"
        sx={{ color: primaryColor }}
      >
        Verify email
      </LoadingButton>
    </Box>
  );
};
