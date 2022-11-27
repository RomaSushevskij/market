import { FC } from 'react';

import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Notification } from 'components/forms/passwordRecovery/Notification';

export const EmailVerify: FC = () => {
  const theme = useTheme();
  const successColor = theme.palette.success.light;
  const primaryColor = theme.palette.primary.light;

  return (
    <Box textAlign="center">
      <Notification
        icon={<PrivacyTipIcon sx={{ fontSize: 100, color: successColor }} />}
        title="Please verify your email"
      />
      <Button variant="outlined" sx={{ color: primaryColor }}>
        Verify email
      </Button>
    </Box>
  );
};
