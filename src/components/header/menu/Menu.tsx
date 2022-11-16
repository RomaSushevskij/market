import React, { FC, useEffect, useMemo, useState } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Menu, MenuItem, Stack } from '@mui/material';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { ORDER_LIST } from 'appConstants';
import { useAppDispatch, useAppSelector } from 'hooks';
import { calculateOrdersTotalCost } from 'store/reducers/orders/ordersReducer';
import {
  selectorOrderList,
  selectorOrderTotalCost,
} from 'store/selectors/orderSelectors';

export const HeaderMenu: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orderTotalCost = useAppSelector(selectorOrderTotalCost);
  const orderList = useAppSelector(selectorOrderList);

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
  };
  const menuId = 'primary-search-account-menu';

  const onShoppingCartClick = () => {
    navigate(ORDER_LIST);
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
