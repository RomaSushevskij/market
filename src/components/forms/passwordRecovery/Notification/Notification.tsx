import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

import { NotificationPropsType } from 'components/forms/passwordRecovery/Notification/types';

export const Notification: FC<NotificationPropsType> = props => {
  const { title, linkTitle, linkPath, icon } = props;
  const theme = useTheme();
  const primaryColor = theme.palette.primary.light;

  return (
    <Stack alignItems="center">
      <Box textAlign="center">
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Box my={2}>{icon}</Box>
      {linkTitle && (
        <Typography variant="body2">
          <Box textAlign="center">
            <NavLink
              to={linkPath || ''}
              style={{
                textDecoration: 'none',
                fontWeight: 'bold',
                color: primaryColor,
              }}
            >
              {linkTitle}
            </NavLink>
          </Box>
        </Typography>
      )}
    </Stack>
  );
};
