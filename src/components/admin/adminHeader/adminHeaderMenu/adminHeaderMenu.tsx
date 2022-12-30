import React, { FC, memo, useState } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import { DropDownMenu } from 'components/header/menu/dropDownMenu';
import { adminRoutes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { signOut } from 'store/reducers';
import { selectIsAdminEmail } from 'store/selectors/adminAuthSelectors';

export const AdminHeaderMenu: FC = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const adminEmail = useAppSelector(selectIsAdminEmail);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onLogOutMenuItemClick = () => {
    setAnchorEl(null);
    dispatch(signOut());
  };

  const onOrdersClick = () => {
    navigate(adminRoutes.ORDERS);
    setAnchorEl(null);
  };

  const onProductsClick = () => {
    navigate(adminRoutes.PRODUCTS);
    setAnchorEl(null);
  };

  const onUsersClick = () => {
    navigate(adminRoutes.USERS);
    setAnchorEl(null);
  };

  return (
    <Stack direction="row" alignItems="center">
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
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
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Badge color="error">
            <MoreIcon />
          </Badge>
        </IconButton>
      </Box>
      <DropDownMenu
        isAdmin
        accountName={adminEmail}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        onLogOutMenuItemClick={onLogOutMenuItemClick}
        onOrdersClick={onOrdersClick}
        onProductsClick={onProductsClick}
        onUsersClick={onUsersClick}
      />
    </Stack>
  );
});
