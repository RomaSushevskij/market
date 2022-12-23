import React, { FC, memo } from 'react';

import LocalMallIcon from '@mui/icons-material/LocalMall';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
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
          <Box flexGrow={1}>
            <Button
              startIcon={<LocalMallIcon sx={{ transform: 'scale(1.5)', mr: 2 }} />}
              sx={{ fontSize: 22, color: 'inherit', textTransform: 'inherit' }}
              onClick={onMenuIconButtonClick}
            >
              i-Shop
            </Button>
          </Box>
          <HeaderMenu />
        </Toolbar>
      </AppBar>
      {isLoading && <ProgressBar />}
    </Box>
  );
});
