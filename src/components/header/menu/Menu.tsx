import React, { FC, useEffect, useMemo, useState } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { logOut, calculateOrdersTotalCost } from 'store/reducers';
import { selectOrderList, selectOrderTotalCost } from 'store/selectors';

export const HeaderMenu: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orderTotalCost = useAppSelector(selectOrderTotalCost);
  const orderList = useAppSelector(selectOrderList);

  const orderItemsTotalCount = useMemo(() => {
    return orderList.reduce((sum, { count }) => sum + count, 0);
  }, [orderList]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    dispatch(logOut());
  };
  const menuId = 'primary-search-account-menu';

  const onShoppingCartClick = () => {
    navigate(routes.ORDER_LIST);
  };

  useEffect(() => {
    dispatch(calculateOrdersTotalCost());
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
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Stack direction="row" alignItems="center">
      {orderTotalCost > 0 && (
        <Typography variant="body1" fontWeight="bold" component="span">
          $ {orderTotalCost}
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
      {renderMenu}
    </Stack>
  );
};
