import React, { FC, useEffect, useMemo, useState } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { DropDownMenu } from './dropDownMenu/dropDownMenu';

import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setOrderListToLocalStorage } from 'services/localStorage';
import { calculateOrdersTotalCost, signOut } from 'store/reducers';
import {
  selectEmail,
  selectOrderList,
  selectOrderTotalCost,
  selectUid,
} from 'store/selectors';
import { toDollars } from 'utils';

export const HeaderMenu: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartOrderTotalCost = useAppSelector(selectOrderTotalCost);
  const cartOrderList = useAppSelector(selectOrderList);
  const uid = useAppSelector(selectUid);
  const email = useAppSelector(selectEmail);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const formattedOrderTotalCost = toDollars.format(cartOrderTotalCost);

  const orderItemsTotalCount = useMemo(() => {
    return cartOrderList.reduce((sum, { count }) => sum + count, 0);
  }, [cartOrderList]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onLogOutMenuItemClick = () => {
    setAnchorEl(null);
    dispatch(signOut());
  };

  const onShoppingCartClick = () => {
    setAnchorEl(null);
    navigate(routes.CART_ORDER_LIST);
  };

  const onShoppingListClick = () => {
    setAnchorEl(null);
    navigate(routes.ORDER_LIST);
  };

  const onProfileClick = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(calculateOrdersTotalCost());
    setOrderListToLocalStorage(cartOrderList, uid);
  }, [cartOrderList, dispatch, uid]);

  return (
    <Stack direction="row" alignItems="center">
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
        {cartOrderTotalCost > 0 && (
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
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <Badge variant={orderItemsTotalCount ? 'dot' : 'standard'} color="error">
            <MoreIcon />
          </Badge>
        </IconButton>
      </Box>
      <DropDownMenu
        isAdmin={false}
        accountName={email}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        onLogOutMenuItemClick={onLogOutMenuItemClick}
        onProfileClick={onProfileClick}
        onShoppingCartClick={onShoppingCartClick}
        onShoppingListClick={onShoppingListClick}
        orderItemsTotalCount={orderItemsTotalCount}
      />
    </Stack>
  );
};
