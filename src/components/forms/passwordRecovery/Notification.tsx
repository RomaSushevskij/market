import React, { FC } from 'react';

import MarkEmailReadOutlined from '@mui/icons-material/MarkEmailReadOutlined';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

import { AUTH_PAGE_ROUTE, AUTH_SIGN_IN_ROUTE } from 'appConstants';

export const Notification: FC = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.light;
  const successColor = theme.palette.success.light;

  return (
    <Stack alignItems="center">
      <Box textAlign="center">
        <Typography variant="h6" component="div">
          The new password has been successfully set
        </Typography>
      </Box>
      <Box my={2}>
        <MarkEmailReadOutlined sx={{ fontSize: 100, color: successColor }} />
      </Box>
      <Typography variant="body2">
        <Box textAlign="center">
          <NavLink
            to={`${AUTH_PAGE_ROUTE}/${AUTH_SIGN_IN_ROUTE}`}
            style={{
              textDecoration: 'none',
              fontWeight: 'bold',
              color: primaryColor,
            }}
          >
            Login with new password
          </NavLink>
        </Box>
      </Typography>
    </Stack>
  );
};
