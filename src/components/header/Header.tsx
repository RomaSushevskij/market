import React, { FC, memo } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { HeaderMenu } from './menu/Menu';

import { PRODUCTS_ROUTE } from 'appConstants';

export const Header: FC = memo(() => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onMenuIconButtonClick = () => {
    navigate(PRODUCTS_ROUTE);
  };

  return (
    <Box sx={{ flexGrow: 1 }} mb={10}>
      <AppBar position="fixed" sx={{ bgcolor: theme.palette.primary.light }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuIconButtonClick}
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
});
