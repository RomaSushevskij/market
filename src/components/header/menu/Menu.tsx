import React, { FC, useEffect, useMemo, useState } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setOrderListToLocalStorage } from 'services/localStorage';
import { calculateOrdersTotalCost, signOut } from 'store/reducers';
import { selectOrderList, selectOrderTotalCost, selectUid } from 'store/selectors';
import { toDollars } from 'utils';

export const HeaderMenu: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orderTotalCost = useAppSelector(selectOrderTotalCost);
  const orderList = useAppSelector(selectOrderList);
  const uid = useAppSelector(selectUid);

  const orderItemsTotalCount = useMemo(() => {
    return orderList.reduce((sum, { count }) => sum + count, 0);
  }, [orderList]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const formattedOrderTotalCost = toDollars.format(orderTotalCost);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const onLogOutMenuItemClick = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
    dispatch(signOut());
  };
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const onShoppingCartClick = () => {
    setMobileMoreAnchorEl(null);
    navigate(routes.ORDER_LIST);
  };

  useEffect(() => {
    dispatch(calculateOrdersTotalCost());
    setOrderListToLocalStorage(orderList, uid);
  }, [orderList]);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={onLogOutMenuItemClick}>Logout</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={onShoppingCartClick}>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={orderItemsTotalCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={onLogOutMenuItemClick}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <LogoutIcon />
        </IconButton>
        <p>LogOut</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Stack direction="row" alignItems="center">
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
        {orderTotalCost > 0 && (
          <Typography variant="body1" fontWeight="bold" component="span">
            {formattedOrderTotalCost}
          </Typography>
        )}
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
          onClick={onShoppingCartClick}
        >
          <Badge badgeContent={orderItemsTotalCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <Badge variant={orderItemsTotalCount ? 'dot' : 'standard'} color="error">
            <MoreIcon />
          </Badge>
        </IconButton>
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </Stack>
  );
};
