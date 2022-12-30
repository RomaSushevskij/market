import React, { FC } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { DropDownMenuProps } from './types';

export const DropDownMenu: FC<DropDownMenuProps> = prop => {
  const {
    anchorEl,
    accountName,
    open,
    onClose,
    onLogOutMenuItemClick,
    onProfileClick,
    onShoppingListClick,
    orderItemsTotalCount,
    onShoppingCartClick,
    onOrdersClick,
    onProductsClick,
    onUsersClick,
    isAdmin,
  } = prop;

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={onClose}
    >
      <ListSubheader sx={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
        Account
      </ListSubheader>
      <ListSubheader
        sx={{ fontWeight: 'normal', lineHeight: 1, mb: 2, textAlign: 'center' }}
      >
        {isAdmin ? (
          <div>
            <div>{accountName}</div>
            <Chip
              label="admin"
              color="warning"
              variant="outlined"
              sx={{ height: 'max-content', fontSize: 12, mt: 1 }}
            />
          </div>
        ) : (
          <div>{accountName}</div>
        )}
      </ListSubheader>
      {isAdmin ? (
        <div>
          <MenuItem onClick={onProductsClick}>
            <ListItemIcon>
              <ListAltIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Products</ListItemText>
          </MenuItem>
          <MenuItem onClick={onOrdersClick}>
            <ListItemIcon>
              <AssignmentIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Orders</ListItemText>
          </MenuItem>
          <MenuItem onClick={onUsersClick}>
            <ListItemIcon>
              <PeopleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Users</ListItemText>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={onShoppingCartClick}>
            <ListItemIcon>
              <ShoppingCartIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cart</ListItemText>
            <Badge badgeContent={orderItemsTotalCount} color="error" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={onProfileClick}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={onShoppingListClick}>
            <ListItemIcon>
              <AssignmentIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Shopping list</ListItemText>
          </MenuItem>
        </div>
      )}

      <Divider />
      <MenuItem onClick={onLogOutMenuItemClick}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
};
