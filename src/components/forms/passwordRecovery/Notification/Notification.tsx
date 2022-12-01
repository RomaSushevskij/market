import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

import { NotificationPropsType } from './types';

export const Notification: FC<NotificationPropsType> = props => {
  const { title, linkTitle, linkPath, icon } = props;
  const theme = useTheme();
  const primaryColor = theme.palette.primary.light;

  const TitleBlock = title.split(' ').map(letter => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(letter)) {
      return (
        <span key={letter}>
          <Typography variant="h6" component="div" sx={{ color: primaryColor }}>
            {letter}
          </Typography>
        </span>
      );
    }

    return ` ${letter} `;
  });

  return (
    <Stack alignItems="center">
      <Box textAlign="center">
        <Typography variant="h6" component="div">
          {TitleBlock}
        </Typography>
      </Box>
      <Box my={2}>{icon}</Box>
      {linkTitle && (
        <Box textAlign="center">
          <Typography variant="body2">
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
          </Typography>
        </Box>
      )}
    </Stack>
  );
};
