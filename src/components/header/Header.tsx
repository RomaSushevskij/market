import React, { ChangeEvent, FC, memo, useState } from 'react';

import LocalMallIcon from '@mui/icons-material/LocalMall';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

import { HeaderMenu } from './menu/Menu';

import {
  SearchIconWrapper,
  StyledInputBase,
  Search,
} from 'components/header/search/Search';
import { ProgressBar } from 'components/progressBar';
import { routes } from 'enums';
import { useAppSelector } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import {
  selectAuthPageStatus,
  selectOrdersPageStatus,
  selectProductsPageStatus,
} from 'store/selectors';

export const Header: FC = memo(() => {
  const { primaryColor } = usePalette();
  const navigate = useNavigate();

  const productsPageStatus = useAppSelector(selectProductsPageStatus);
  const authPageStatus = useAppSelector(selectAuthPageStatus);
  const ordersPageStatus = useAppSelector(selectOrdersPageStatus);
  const isLoading =
    productsPageStatus === 'loading' ||
    authPageStatus === 'loading' ||
    ordersPageStatus === 'loading';

  const [searchValue, setSearchValue] = useState('');

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const onMenuIconButtonClick = () => {
    navigate(routes.PRODUCTS);
  };

  return (
    <Box sx={{ flexGrow: 1 }} mb={10}>
      <AppBar position="fixed" sx={{ bgcolor: primaryColor }}>
        <Toolbar>
          <Box flexGrow={1}>
            <Button
              startIcon={
                <LocalMallIcon sx={{ transform: 'scale(1.5)', mr: { sx: 0.5, sm: 2 } }} />
              }
              sx={{
                fontSize: { xs: 16, sm: 22 },
                color: 'inherit',
                textTransform: 'inherit',
                minWidth: 100,
              }}
              onClick={onMenuIconButtonClick}
            >
              i-Shop
            </Button>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchValue}
              onChange={onSearchInputChange}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <HeaderMenu />
        </Toolbar>
      </AppBar>
      {isLoading && <ProgressBar />}
    </Box>
  );
});
