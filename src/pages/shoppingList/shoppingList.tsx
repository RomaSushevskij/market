import React, { FC, memo, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Navigate } from 'react-router-dom';

import { adminRoutes, routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { ShoppingListRow } from 'pages/shoppingList/shoppingListRow/shoppingListRow';
import { ShoppingListProps } from 'pages/shoppingList/types';
import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';
import { fetchOrders } from 'store/reducers/orders/ordersReducer';
import {
  selectAdminOrders,
  selectIsAuth,
  selectUid,
  selectUserOrders,
} from 'store/selectors';
import { selectIsAdminAuth } from 'store/selectors/adminAuthSelectors';

export const ShoppingList: FC<ShoppingListProps> = memo(prop => {
  const { isAdmin } = prop;

  const dispatch = useAppDispatch();

  const userOrders = useAppSelector(selectUserOrders);
  const adminOrders = useAppSelector(selectAdminOrders);
  const uId = useAppSelector(selectUid) as string;
  const isAuth = useAppSelector(selectIsAuth);
  const isAdminAuth = useAppSelector(selectIsAdminAuth);

  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    if (isAdmin) dispatch(fetchOrders());
    else dispatch(fetchOrders(uId));
  }, [dispatch, uId, isAdmin]);

  useEffect(() => {
    if (isAdmin) setOrders(adminOrders);
    else {
      setOrders(userOrders);
    }
  }, [isAdmin, adminOrders, userOrders]);

  const orderAccordions = orders.map(
    ({
      orderList,
      orderId,
      totalCost,
      orderStatus,
      orderDate,
      productsNumber,
      phone,
      name,
      surname,
      address,
    }) => {
      return (
        <ShoppingListRow
          key={orderId}
          orderList={orderList}
          orderId={orderId}
          totalCost={totalCost}
          orderStatus={orderStatus}
          orderDate={orderDate}
          productsNumber={productsNumber}
          phone={phone}
          name={name}
          surname={surname}
          address={address}
          isAdmin={isAdmin}
        />
      );
    },
  );

  if (isAdmin && !isAdminAuth) {
    return <Navigate to={adminRoutes.AUTH_PAGE} />;
  }
  if (!isAdmin && !isAuth) {
    return <Navigate to={routes.AUTH_PAGE} />;
  }

  return (
    <Box>
      {!!orders.length && (
        <Paper>
          <Typography sx={{ p: 2 }} variant="h6" component="div">
            {isAdmin ? 'Orders' : 'Shopping list'}
          </Typography>
          {orderAccordions}
        </Paper>
      )}
    </Box>
  );
});
