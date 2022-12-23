import React, { FC, memo, useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { collection, getDocs } from 'firebase/firestore';

import { collections } from 'api/enums';
import { OrderStepper } from 'pages/shoppingList/shoppingListRow/orderStepper';
import { ShoppingListRow } from 'pages/shoppingList/shoppingListRow/shoppingListRow';
import { db } from 'services/firebase';
import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';

export const ShoppingList: FC = memo(() => {
  const [orders, setOrders] = useState<AdminOrder[]>();

  const productsNumber = useMemo(() => {
    let productsNumber = 0;

    orders?.forEach(adminOrder => {
      const orderCount = adminOrder.orderList.reduce((sum, productOrder) => {
        return sum + productOrder.count;
      }, 0);

      productsNumber += orderCount;
    });

    return productsNumber;
  }, [orders]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { docs } = await getDocs(collection(db, collections.ORDERS));
      const orders = docs.map(doc => {
        const orderData = doc.data() as AdminOrder;
        const order: AdminOrder = {
          ...orderData,
          orderId: doc.id,
        };

        return order;
      });

      setOrders(orders);
    };

    fetchOrders();
  }, []);
  // const userOrders = useAppSelector(selectUserOrders);
  const orderAccordions = orders?.map(
    ({ orderList, orderId, totalCost, orderStatus, orderDate }) => {
      return (
        <ShoppingListRow
          key={orderId}
          orderList={orderList}
          orderId={orderId}
          totalCost={totalCost}
          orderStatus={orderStatus}
          orderDate={orderDate}
          productsNumber={productsNumber}
        />
      );
    },
  );

  return (
    <Box>
      <Paper>
        <Typography sx={{ p: 2 }} variant="h6" component="div">
          Shopping list
        </Typography>
        {orderAccordions}
        <OrderStepper />
      </Paper>
    </Box>
  );
});
