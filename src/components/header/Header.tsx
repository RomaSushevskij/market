import React, { FC } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { HeaderMenu } from './menu/Menu';

export const Header: FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <AppBar position="static" sx={{ bgcolor: theme.palette.primary.light }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shop
          </Typography>
          <HeaderMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
