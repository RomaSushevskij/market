import React, { FC, memo, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Navigate } from 'react-router-dom';

import { PaginationBlock } from 'components/paginationBlock';
import { adminRoutes, routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { ShoppingListRow } from 'pages/shoppingList/shoppingListRow/shoppingListRow';
import { ShoppingListProps } from 'pages/shoppingList/types';
import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';
import { fetchOrders } from 'store/reducers/orders/ordersReducer';
import {
  selectAdminOrders,
  selectIsAuth,
  selectAdminOrdersCurrentPage,
  selectAdminOrdersPageSize,
  selectOrdersCurrentPage,
  selectOrdersPageSize,
  selectUid,
  selectUserOrders,
  selectOrdersTotalCount,
  selectAdminOrdersTotalCount,
} from 'store/selectors';
import { selectIsAdminAuth } from 'store/selectors/adminAuthSelectors';

export const ShoppingList: FC<ShoppingListProps> = memo(prop => {
  const { isAdmin } = prop;

  const dispatch = useAppDispatch();

  const userOrders = useAppSelector(selectUserOrders);
  const adminOrders = useAppSelector(selectAdminOrders);
  const userId = useAppSelector(selectUid) as string;
  const isAuth = useAppSelector(selectIsAuth);
  const isAdminAuth = useAppSelector(selectIsAdminAuth);
  const ordersCurrentPage = useAppSelector(selectOrdersCurrentPage);
  const ordersPageSize = useAppSelector(selectOrdersPageSize);
  const ordersTotalCount = useAppSelector(selectOrdersTotalCount);
  const adminOrdersCurrentPage = useAppSelector(selectAdminOrdersCurrentPage);
  const adminOrdersPageSize = useAppSelector(selectAdminOrdersPageSize);
  const adminOrdersTotalCount = useAppSelector(selectAdminOrdersTotalCount);

  const [orders, setOrders] = useState<AdminOrder[]>([]);

  const currentPage = isAdmin ? adminOrdersCurrentPage : ordersCurrentPage;
  const pageSize = isAdmin ? adminOrdersPageSize : ordersPageSize;
  const totalCount = isAdmin ? adminOrdersTotalCount : ordersTotalCount;

  useEffect(() => {
    if (isAdmin) dispatch(fetchOrders({ currentPage: 1, pageSize }));
    else dispatch(fetchOrders({ userId, pageSize, currentPage: 1 }));
  }, [dispatch, userId, isAdmin]);

  useEffect(() => {
    if (isAdmin) setOrders(adminOrders);
    else {
      setOrders(userOrders);
    }
  }, [isAdmin, adminOrders, userOrders]);

  const onPaginationPageChange = (pageNumber: number) => {
    dispatch(fetchOrders({ userId, currentPage: pageNumber }));
  };

  const onPaginationPageSizeChange = (pageSize: number) => {
    dispatch(fetchOrders({ userId, pageSize, currentPage: 1 }));
  };

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
      isViewedByAdmin,
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
          isViewedByAdmin={isViewedByAdmin}
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
          <Box paddingY={2}>
            <PaginationBlock
              onPageChange={onPaginationPageChange}
              itemsTotalCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageSizeChange={onPaginationPageSizeChange}
            />
          </Box>
        </Paper>
      )}
    </Box>
  );
});
