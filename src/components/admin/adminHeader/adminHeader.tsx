import React, { FC } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { usePalette } from 'hooks/usePalette/usePalette';

export const AdminHeader: FC = () => {
  const { primaryColor } = usePalette();

  return (
    <Box sx={{ flexGrow: 1 }} mb={10}>
      <AppBar position="fixed" sx={{ bgcolor: primaryColor }}>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};
