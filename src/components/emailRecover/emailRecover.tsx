import { FC, useState } from 'react';

import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import RestoreIcon from '@mui/icons-material/Restore';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';

import { Notification } from 'components/forms/passwordRecovery/Notification';
import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { verifyEmail } from 'store/reducers';
import { selectAuthPageStatus } from 'store/selectors';

export const EmailRecover: FC = () => {
  const dispatch = useAppDispatch();

  const { primaryColor, successColor } = usePalette();
  const [searchParams] = useSearchParams();

  const [isRecoverEmail, setRecoverEmail] = useState(false);

  const authPageStatus = useAppSelector(selectAuthPageStatus);

  const oobCode = searchParams.get('oobCode') || '';

  const onRecoverEmailClick = async () => {
    const resultAction = await dispatch(verifyEmail(oobCode));

    if (verifyEmail.fulfilled.match(resultAction)) {
      setRecoverEmail(true);
    }
  };

  if (isRecoverEmail) {
    return (
      <Notification
        icon={<MarkEmailReadIcon sx={{ fontSize: 100, color: successColor }} />}
        title="Account email reverted to restored Email"
        linkTitle="Try logging in"
        linkPath={routes.ABSOLUTE_AUTH_SIGN_IN}
      />
    );
  }

  return (
    <Box textAlign="center">
      <Notification
        icon={<RestoreIcon sx={{ fontSize: 100, color: successColor }} />}
        title="Click to restore old email"
      />
      <LoadingButton
        loading={authPageStatus === 'loading'}
        onClick={onRecoverEmailClick}
        variant="outlined"
        sx={{ color: primaryColor }}
      >
        Revert to the old email
      </LoadingButton>
    </Box>
  );
};
