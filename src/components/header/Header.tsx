import React, { FC, memo } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { HeaderMenu } from './menu/Menu';

import { ProgressBar } from 'components/progressBar';
import { routes } from 'enums';
import { useAppSelector } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { selectAuthPageStatus, selectProductsPageStatus } from 'store/selectors';

export const Header: FC = memo(() => {
  const { primaryColor } = usePalette();
  const navigate = useNavigate();

  const productsPageStatus = useAppSelector(selectProductsPageStatus);
  const authPageStatus = useAppSelector(selectAuthPageStatus);
  const isLoading = productsPageStatus === 'loading' || authPageStatus === 'loading';

  const onMenuIconButtonClick = () => {
    navigate(routes.PRODUCTS);
  };

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
      {isLoading && <ProgressBar />}
    </Box>
  );
});
